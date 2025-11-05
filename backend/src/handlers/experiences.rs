use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use crate::db::DbPool;
use crate::models::{Experience, CreateExperience, UpdateExperience};

pub async fn get_experiences(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Experience>>, (StatusCode, String)> {
    let experiences = sqlx::query_as::<_, Experience>(
        "SELECT * FROM experiences ORDER BY is_current DESC, start_date DESC"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(experiences))
}

pub async fn get_experience_by_id(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<Json<Experience>, (StatusCode, String)> {
    let experience = sqlx::query_as::<_, Experience>(
        "SELECT * FROM experiences WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or_else(|| (StatusCode::NOT_FOUND, "Experience not found".to_string()))?;

    Ok(Json(experience))
}

pub async fn create_experience(
    State(pool): State<DbPool>,
    Json(payload): Json<CreateExperience>,
) -> Result<(StatusCode, Json<Experience>), (StatusCode, String)> {
    let experience = sqlx::query_as::<_, Experience>(
        r#"
        INSERT INTO experiences (company, position, description, start_date, end_date, is_current, location, tech_stack)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        "#
    )
    .bind(&payload.company)
    .bind(&payload.position)
    .bind(&payload.description)
    .bind(payload.start_date)
    .bind(payload.end_date)
    .bind(payload.is_current.unwrap_or(false))
    .bind(&payload.location)
    .bind(&payload.tech_stack)
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((StatusCode::CREATED, Json(experience)))
}

pub async fn delete_experience(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM experiences WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "Experience not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}
