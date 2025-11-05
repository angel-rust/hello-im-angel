use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Contact {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub subject: Option<String>,
    pub message: String,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateContact {
    pub name: String,
    pub email: String,
    pub subject: Option<String>,
    pub message: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateContactStatus {
    pub status: String, // 'new', 'read', 'replied', 'archived'
}
