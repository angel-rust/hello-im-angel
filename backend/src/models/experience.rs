use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc, NaiveDate};

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Experience {
    pub id: i32,
    pub company: String,
    pub position: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
    pub is_current: bool,
    pub location: Option<String>,
    #[sqlx(default)]
    pub tech_stack: Vec<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateExperience {
    pub company: String,
    pub position: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
    pub is_current: Option<bool>,
    pub location: Option<String>,
    pub tech_stack: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateExperience {
    pub company: Option<String>,
    pub position: Option<String>,
    pub description: Option<String>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
    pub is_current: Option<bool>,
    pub location: Option<String>,
    pub tech_stack: Option<Vec<String>>,
}
