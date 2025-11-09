mod handlers;
mod models;

use axum::{
    routing::{get, post},
    Router,
};
use sqlx::postgres::PgPoolOptions;
use std::sync::Arc;
use tera::Tera;
use tower_http::{
    compression::CompressionLayer,
    cors::CorsLayer,
    services::ServeDir,
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
    pub tera: Arc<Tera>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "angel_portfolio=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load environment variables
    dotenvy::dotenv().ok();

    // Get configuration from environment
    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Create database connection pool
    tracing::info!("Connecting to database...");
    let db = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    // Run migrations
    tracing::info!("Running migrations...");
    sqlx::migrate!("./migrations").run(&db).await?;

    // Initialize Tera templates
    tracing::info!("Loading templates...");
    let tera = match Tera::new("templates/**/*.html") {
        Ok(t) => Arc::new(t),
        Err(e) => {
            tracing::error!("Template parsing error: {}", e);
            std::process::exit(1);
        }
    };

    // Create app state
    let state = AppState { db, tera };

    // Build router
    let app = Router::new()
        // Pages
        .route("/", get(handlers::pages::index))
        .route("/about", get(handlers::pages::about))
        .route("/projects", get(handlers::pages::projects))
        .route("/contact", get(handlers::pages::contact_page))
        // API endpoints
        .route("/api/contact", post(handlers::contact::submit_contact))
        // Static files
        .nest_service("/static", ServeDir::new("static"))
        // Middleware
        .layer(CompressionLayer::new())
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http())
        // State
        .with_state(state);

    // Start server
    let addr = format!("{}:{}", host, port);
    let listener = tokio::net::TcpListener::bind(&addr).await?;

    tracing::info!("🚀 Server running on http://{}", addr);

    axum::serve(listener, app).await?;

    Ok(())
}
