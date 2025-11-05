use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use crate::db::DbPool;
use crate::models::{Project, CreateProject, UpdateProject};

pub async fn get_projects(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Project>>, (StatusCode, String)> {
    let projects = sqlx::query_as::<_, Project>(
        "SELECT * FROM projects ORDER BY featured DESC, year DESC, created_at DESC"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(projects))
}

pub async fn get_project_by_id(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<Json<Project>, (StatusCode, String)> {
    let project = sqlx::query_as::<_, Project>(
        "SELECT * FROM projects WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or_else(|| (StatusCode::NOT_FOUND, "Project not found".to_string()))?;

    Ok(Json(project))
}

pub async fn get_featured_projects(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Project>>, (StatusCode, String)> {
    let projects = sqlx::query_as::<_, Project>(
        "SELECT * FROM projects WHERE featured = true ORDER BY year DESC, created_at DESC"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(projects))
}

pub async fn create_project(
    State(pool): State<DbPool>,
    Json(payload): Json<CreateProject>,
) -> Result<(StatusCode, Json<Project>), (StatusCode, String)> {
    let project = sqlx::query_as::<_, Project>(
        r#"
        INSERT INTO projects (title, description, github_url, live_url, tech_stack, year, featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        "#
    )
    .bind(&payload.title)
    .bind(&payload.description)
    .bind(&payload.github_url)
    .bind(&payload.live_url)
    .bind(&payload.tech_stack)
    .bind(&payload.year)
    .bind(payload.featured.unwrap_or(false))
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((StatusCode::CREATED, Json(project)))
}

pub async fn update_project(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
    Json(payload): Json<UpdateProject>,
) -> Result<Json<Project>, (StatusCode, String)> {
    // First, check if project exists
    let existing = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Project not found".to_string()))?;

    // Build dynamic update query
    let mut query_parts = Vec::new();
    let mut param_count = 1;

    if payload.title.is_some() {
        query_parts.push(format!("title = ${}", param_count));
        param_count += 1;
    }
    if payload.description.is_some() {
        query_parts.push(format!("description = ${}", param_count));
        param_count += 1;
    }
    if payload.github_url.is_some() {
        query_parts.push(format!("github_url = ${}", param_count));
        param_count += 1;
    }
    if payload.live_url.is_some() {
        query_parts.push(format!("live_url = ${}", param_count));
        param_count += 1;
    }
    if payload.tech_stack.is_some() {
        query_parts.push(format!("tech_stack = ${}", param_count));
        param_count += 1;
    }
    if payload.year.is_some() {
        query_parts.push(format!("year = ${}", param_count));
        param_count += 1;
    }
    if payload.featured.is_some() {
        query_parts.push(format!("featured = ${}", param_count));
        param_count += 1;
    }
    if payload.github_stars.is_some() {
        query_parts.push(format!("github_stars = ${}", param_count));
        param_count += 1;
    }
    if payload.github_forks.is_some() {
        query_parts.push(format!("github_forks = ${}", param_count));
        param_count += 1;
    }

    if query_parts.is_empty() {
        return Ok(Json(existing));
    }

    let query_str = format!(
        "UPDATE projects SET {} WHERE id = ${} RETURNING *",
        query_parts.join(", "),
        param_count
    );

    let mut query = sqlx::query_as::<_, Project>(&query_str);

    if let Some(title) = payload.title {
        query = query.bind(title);
    }
    if let Some(description) = payload.description {
        query = query.bind(description);
    }
    if let Some(github_url) = payload.github_url {
        query = query.bind(github_url);
    }
    if let Some(live_url) = payload.live_url {
        query = query.bind(live_url);
    }
    if let Some(tech_stack) = payload.tech_stack {
        query = query.bind(tech_stack);
    }
    if let Some(year) = payload.year {
        query = query.bind(year);
    }
    if let Some(featured) = payload.featured {
        query = query.bind(featured);
    }
    if let Some(github_stars) = payload.github_stars {
        query = query.bind(github_stars);
    }
    if let Some(github_forks) = payload.github_forks {
        query = query.bind(github_forks);
    }

    query = query.bind(id);

    let project = query
        .fetch_one(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(project))
}

pub async fn delete_project(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "Project not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}
