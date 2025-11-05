use axum::{
    extract::{Path, State, ConnectInfo},
    http::{StatusCode, HeaderMap},
    Json,
};
use std::net::SocketAddr;
use crate::db::DbPool;
use crate::models::{Contact, CreateContact, UpdateContactStatus};

pub async fn create_contact(
    State(pool): State<DbPool>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    headers: HeaderMap,
    Json(payload): Json<CreateContact>,
) -> Result<(StatusCode, Json<Contact>), (StatusCode, String)> {
    // Extract IP address
    let ip_address = addr.ip().to_string();

    // Extract user agent
    let user_agent = headers
        .get("user-agent")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string());

    // Basic email validation
    if !payload.email.contains('@') {
        return Err((StatusCode::BAD_REQUEST, "Invalid email address".to_string()));
    }

    // Basic validation
    if payload.name.trim().is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Name is required".to_string()));
    }

    if payload.message.trim().is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Message is required".to_string()));
    }

    let contact = sqlx::query_as::<_, Contact>(
        r#"
        INSERT INTO contacts (name, email, subject, message, ip_address, user_agent, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'new')
        RETURNING *
        "#
    )
    .bind(&payload.name)
    .bind(&payload.email)
    .bind(&payload.subject)
    .bind(&payload.message)
    .bind(Some(ip_address))
    .bind(user_agent)
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // TODO: Send email notification using Resend
    tracing::info!("New contact submission from {}: {}", contact.email, contact.name);

    Ok((StatusCode::CREATED, Json(contact)))
}

pub async fn get_contacts(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Contact>>, (StatusCode, String)> {
    let contacts = sqlx::query_as::<_, Contact>(
        "SELECT * FROM contacts ORDER BY created_at DESC"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(contacts))
}

pub async fn get_contact_by_id(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<Json<Contact>, (StatusCode, String)> {
    let contact = sqlx::query_as::<_, Contact>(
        "SELECT * FROM contacts WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or_else(|| (StatusCode::NOT_FOUND, "Contact not found".to_string()))?;

    Ok(Json(contact))
}

pub async fn update_contact_status(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
    Json(payload): Json<UpdateContactStatus>,
) -> Result<Json<Contact>, (StatusCode, String)> {
    // Validate status
    if !["new", "read", "replied", "archived"].contains(&payload.status.as_str()) {
        return Err((StatusCode::BAD_REQUEST, "Invalid status value".to_string()));
    }

    let contact = sqlx::query_as::<_, Contact>(
        "UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *"
    )
    .bind(&payload.status)
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or_else(|| (StatusCode::NOT_FOUND, "Contact not found".to_string()))?;

    Ok(Json(contact))
}

pub async fn delete_contact(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM contacts WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "Contact not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}
