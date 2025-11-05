use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};
use serde_json::Value as JsonValue;

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct ResumeData {
    pub id: i32,
    pub section: String,
    pub content: JsonValue,
    pub order_index: i32,
    pub is_visible: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateResumeData {
    pub section: String,
    pub content: JsonValue,
    pub order_index: Option<i32>,
    pub is_visible: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateResumeData {
    pub section: Option<String>,
    pub content: Option<JsonValue>,
    pub order_index: Option<i32>,
    pub is_visible: Option<bool>,
}
