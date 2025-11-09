use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::Validate;

#[derive(Debug, Clone, FromRow, Serialize)]
pub struct ContactMessage {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub message: String,
    pub created_at: DateTime<Utc>,
    pub read: bool,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateContactMessage {
    #[validate(length(min = 2, max = 255, message = "Name must be between 2 and 255 characters"))]
    pub name: String,

    #[validate(email(message = "Invalid email address"))]
    pub email: String,

    #[validate(length(min = 10, max = 5000, message = "Message must be between 10 and 5000 characters"))]
    pub message: String,
}
