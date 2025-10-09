use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    message: String,
}

#[derive(Serialize, Deserialize)]
struct Project {
    id: i32,
    title: String,
    description: String,
    github_url: Option<String>,
    live_url: Option<String>,
    tech_stack: Vec<String>,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/projects", get(get_projects))
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    tracing::info!("Server listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> (StatusCode, Json<HealthResponse>) {
    (
        StatusCode::OK,
        Json(HealthResponse {
            status: "ok".to_string(),
            message: "Angel Medina Portfolio API is running".to_string(),
        }),
    )
}

async fn get_projects() -> (StatusCode, Json<Vec<Project>>) {
    let projects = vec![
        Project {
            id: 1,
            title: "FlightMate V3".to_string(),
            description: "Flight tracking and management system".to_string(),
            github_url: Some("https://github.com/angel-rust/flightmate-v3".to_string()),
            live_url: Some("https://web-three-bice-76.vercel.app".to_string()),
            tech_stack: vec!["Next.js".to_string(), "TypeScript".to_string(), "PostgreSQL".to_string()],
        },
    ];

    (StatusCode::OK, Json(projects))
}
