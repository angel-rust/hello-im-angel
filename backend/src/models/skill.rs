use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Skill {
    pub id: i32,
    pub name: String,
    pub category: String,
    pub proficiency: i32,
    pub icon: Option<String>,
    pub order_index: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateSkill {
    pub name: String,
    pub category: String,
    pub proficiency: i32,
    pub icon: Option<String>,
    pub order_index: Option<i32>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateSkill {
    pub name: Option<String>,
    pub category: Option<String>,
    pub proficiency: Option<i32>,
    pub icon: Option<String>,
    pub order_index: Option<i32>,
}
