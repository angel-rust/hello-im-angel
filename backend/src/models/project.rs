use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Project {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    #[sqlx(default)]
    pub tech_stack: Vec<String>,
    pub year: Option<i32>,
    pub featured: bool,
    pub github_stars: i32,
    pub github_forks: i32,
    pub last_updated: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateProject {
    pub title: String,
    pub description: String,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    pub tech_stack: Vec<String>,
    pub year: Option<i32>,
    pub featured: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProject {
    pub title: Option<String>,
    pub description: Option<String>,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    pub tech_stack: Option<Vec<String>>,
    pub year: Option<i32>,
    pub featured: Option<bool>,
    pub github_stars: Option<i32>,
    pub github_forks: Option<i32>,
}
