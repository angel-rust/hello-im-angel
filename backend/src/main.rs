mod db;
mod models;
mod handlers;

use axum::{
    routing::{get, post, put, delete},
    http::{StatusCode, Method},
    Json, Router,
};
use serde::Serialize;
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    message: String,
    version: String,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
    message: String,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenv::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://localhost/portfolio".to_string());

    // Create database pool
    tracing::info!("Connecting to database...");
    let pool = match db::create_pool(&database_url).await {
        Ok(pool) => {
            tracing::info!("Database connection established");
            pool
        }
        Err(e) => {
            tracing::error!("Failed to connect to database: {}", e);
            tracing::warn!("Starting server without database connection - will use fallback data");
            // In production, you might want to panic here instead
            // For development, we'll continue without DB
            return;
        }
    };

    // Run migrations
    tracing::info!("Running database migrations...");
    if let Err(e) = db::run_migrations(&pool).await {
        tracing::error!("Failed to run migrations: {}", e);
        tracing::warn!("Continuing without migrations - database may be out of sync");
    } else {
        tracing::info!("Migrations completed successfully");
    }

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE, Method::PATCH])
        .allow_headers(Any);

    // Build application routes
    let app = Router::new()
        // Health check
        .route("/health", get(health_check))

        // Projects routes
        .route("/api/projects", get(handlers::get_projects))
        .route("/api/projects", post(handlers::create_project))
        .route("/api/projects/featured", get(handlers::get_featured_projects))
        .route("/api/projects/:id", get(handlers::get_project_by_id))
        .route("/api/projects/:id", put(handlers::update_project))
        .route("/api/projects/:id", delete(handlers::delete_project))

        // Skills routes
        .route("/api/skills", get(handlers::get_skills))
        .route("/api/skills", post(handlers::create_skill))
        .route("/api/skills/:id", get(handlers::get_skill_by_id))
        .route("/api/skills/:id", put(handlers::update_skill))
        .route("/api/skills/:id", delete(handlers::delete_skill))

        // Experiences routes
        .route("/api/experiences", get(handlers::get_experiences))
        .route("/api/experiences", post(handlers::create_experience))
        .route("/api/experiences/:id", get(handlers::get_experience_by_id))
        .route("/api/experiences/:id", delete(handlers::delete_experience))

        // Contacts routes
        .route("/api/contact", post(handlers::create_contact))
        .route("/api/contacts", get(handlers::get_contacts))
        .route("/api/contacts/:id", get(handlers::get_contact_by_id))
        .route("/api/contacts/:id", put(handlers::update_contact_status))
        .route("/api/contacts/:id", delete(handlers::delete_contact))

        // Resume routes
        .route("/api/resume", get(handlers::get_resume_data))
        .route("/api/resume", post(handlers::create_resume_data))
        .route("/api/resume/:section", get(handlers::get_resume_section))
        .route("/api/resume/:id", put(handlers::update_resume_data))
        .route("/api/resume/:id", delete(handlers::delete_resume_data))

        // GitHub sync route
        .route("/api/github/sync", post(handlers::sync_github_projects))

        // Add database pool and CORS to state
        .with_state(pool)
        .layer(cors);

    // Get port from environment or use default
    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "3001".to_string())
        .parse::<u16>()
        .unwrap_or(3001);

    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    tracing::info!("🚀 Server listening on http://{}", addr);
    tracing::info!("📊 API endpoints available:");
    tracing::info!("   GET  /health");
    tracing::info!("   GET  /api/projects");
    tracing::info!("   GET  /api/skills");
    tracing::info!("   GET  /api/experiences");
    tracing::info!("   POST /api/contact");
    tracing::info!("   GET  /api/resume");
    tracing::info!("   POST /api/github/sync");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .unwrap();
}

async fn health_check() -> (StatusCode, Json<HealthResponse>) {
    (
        StatusCode::OK,
        Json(HealthResponse {
            status: "ok".to_string(),
            message: "Angel Medina Portfolio API is running".to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
        }),
    )
}
