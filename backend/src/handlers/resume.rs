use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use crate::db::DbPool;
use crate::models::{ResumeData, CreateResumeData, UpdateResumeData};

pub async fn get_resume_data(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<ResumeData>>, (StatusCode, String)> {
    let resume_data = sqlx::query_as::<_, ResumeData>(
        "SELECT * FROM resume_data WHERE is_visible = true ORDER BY order_index, section"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(resume_data))
}

pub async fn get_resume_section(
    State(pool): State<DbPool>,
    Path(section): Path<String>,
) -> Result<Json<Vec<ResumeData>>, (StatusCode, String)> {
    let resume_data = sqlx::query_as::<_, ResumeData>(
        "SELECT * FROM resume_data WHERE section = $1 AND is_visible = true ORDER BY order_index"
    )
    .bind(&section)
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(resume_data))
}

pub async fn create_resume_data(
    State(pool): State<DbPool>,
    Json(payload): Json<CreateResumeData>,
) -> Result<(StatusCode, Json<ResumeData>), (StatusCode, String)> {
    let resume_data = sqlx::query_as::<_, ResumeData>(
        r#"
        INSERT INTO resume_data (section, content, order_index, is_visible)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        "#
    )
    .bind(&payload.section)
    .bind(&payload.content)
    .bind(payload.order_index.unwrap_or(0))
    .bind(payload.is_visible.unwrap_or(true))
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((StatusCode::CREATED, Json(resume_data)))
}

pub async fn update_resume_data(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
    Json(payload): Json<UpdateResumeData>,
) -> Result<Json<ResumeData>, (StatusCode, String)> {
    // Check if resume data exists
    let existing = sqlx::query_as::<_, ResumeData>("SELECT * FROM resume_data WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Resume data not found".to_string()))?;

    let section = payload.section.unwrap_or(existing.section);
    let content = payload.content.unwrap_or(existing.content);
    let order_index = payload.order_index.unwrap_or(existing.order_index);
    let is_visible = payload.is_visible.unwrap_or(existing.is_visible);

    let resume_data = sqlx::query_as::<_, ResumeData>(
        "UPDATE resume_data SET section = $1, content = $2, order_index = $3, is_visible = $4 WHERE id = $5 RETURNING *"
    )
    .bind(section)
    .bind(content)
    .bind(order_index)
    .bind(is_visible)
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(resume_data))
}

pub async fn delete_resume_data(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM resume_data WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "Resume data not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}
