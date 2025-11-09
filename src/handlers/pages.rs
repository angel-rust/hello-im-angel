use axum::{extract::State, response::Html};
use tera::Context;

use crate::AppState;

pub async fn index(State(state): State<AppState>) -> Html<String> {
    let mut context = Context::new();
    context.insert("page_title", "Angel Medina - Full Stack Rust Engineer");
    context.insert("active_page", "home");

    let html = state
        .tera
        .render("pages/index.html", &context)
        .unwrap_or_else(|e| format!("Error rendering template: {}", e));

    Html(html)
}

pub async fn about(State(state): State<AppState>) -> Html<String> {
    let mut context = Context::new();
    context.insert("page_title", "About - Angel Medina");
    context.insert("active_page", "about");

    let html = state
        .tera
        .render("pages/about.html", &context)
        .unwrap_or_else(|e| format!("Error rendering template: {}", e));

    Html(html)
}

pub async fn projects(State(state): State<AppState>) -> Html<String> {
    let mut context = Context::new();
    context.insert("page_title", "Projects - Angel Medina");
    context.insert("active_page", "projects");

    // Real projects from GitHub
    let projects = vec![
        serde_json::json!({
            "name": "FlightMate v0.3",
            "description": "Production ready flight deal platform serving 380 US cities with 373 airports. Features regional email clustering (10 US regions), passwordless magic link authentication, comprehensive admin dashboard with audit trails, Stripe subscription management ($4.99/mo or $49/yr), and smart email delivery with click tracking. Built with Rust + Axum + PostgreSQL (24 normalized tables) + Redis + Resend API. Currently in active development.",
            "tech": ["Rust", "Axum", "SQLX", "PostgreSQL", "Redis", "Stripe", "Tera", "HTMX"],
            "github": "https://github.com/angel-rust/flightmate-v0.3",
            "live": null
        }),
        serde_json::json!({
            "name": "Trezza Blockchain",
            "description": "Decentralized Layer 1 blockchain payment ecosystem on Solana Network, designed to eliminate transaction fees. Rust-native POS terminal for seamless merchant integration and fast, secure payments.",
            "tech": ["Rust", "Solana", "Web3", "Blockchain"],
            "github": "https://github.com/angel-rust/trezza-Blockchain",
            "live": null
        }),
        serde_json::json!({
            "name": "Angel's Portfolio",
            "description": "This portfolio website! Built with Rust, Axum, Tera templates, Three.js for 3D graphics, and HTMX for dynamic interactions. Features elegant black/gold/white theme and custom 3D background animations.",
            "tech": ["Rust", "Axum", "Tera", "HTMX", "Three.js", "Tailwind"],
            "github": "https://github.com/angel-rust/hello-im-angel",
            "live": null
        }),
    ];

    context.insert("projects", &projects);

    let html = state
        .tera
        .render("pages/projects.html", &context)
        .unwrap_or_else(|e| format!("Error rendering template: {}", e));

    Html(html)
}

pub async fn contact_page(State(state): State<AppState>) -> Html<String> {
    let mut context = Context::new();
    context.insert("page_title", "Contact - Angel Medina");
    context.insert("active_page", "contact");

    let html = state
        .tera
        .render("pages/contact.html", &context)
        .unwrap_or_else(|e| format!("Error rendering template: {}", e));

    Html(html)
}
