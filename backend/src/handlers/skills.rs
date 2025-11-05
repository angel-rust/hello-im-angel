use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use crate::db::DbPool;
use crate::models::{Skill, CreateSkill, UpdateSkill};

pub async fn get_skills(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Skill>>, (StatusCode, String)> {
    let skills = sqlx::query_as::<_, Skill>(
        "SELECT * FROM skills ORDER BY category, order_index, name"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(skills))
}

pub async fn get_skill_by_id(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<Json<Skill>, (StatusCode, String)> {
    let skill = sqlx::query_as::<_, Skill>(
        "SELECT * FROM skills WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or_else(|| (StatusCode::NOT_FOUND, "Skill not found".to_string()))?;

    Ok(Json(skill))
}

pub async fn create_skill(
    State(pool): State<DbPool>,
    Json(payload): Json<CreateSkill>,
) -> Result<(StatusCode, Json<Skill>), (StatusCode, String)> {
    let skill = sqlx::query_as::<_, Skill>(
        r#"
        INSERT INTO skills (name, category, proficiency, icon, order_index)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        "#
    )
    .bind(&payload.name)
    .bind(&payload.category)
    .bind(payload.proficiency)
    .bind(&payload.icon)
    .bind(payload.order_index.unwrap_or(0))
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((StatusCode::CREATED, Json(skill)))
}

pub async fn update_skill(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
    Json(payload): Json<UpdateSkill>,
) -> Result<Json<Skill>, (StatusCode, String)> {
    // Check if skill exists
    let existing = sqlx::query_as::<_, Skill>("SELECT * FROM skills WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Skill not found".to_string()))?;

    let name = payload.name.unwrap_or(existing.name);
    let category = payload.category.unwrap_or(existing.category);
    let proficiency = payload.proficiency.unwrap_or(existing.proficiency);
    let icon = payload.icon.or(existing.icon);
    let order_index = payload.order_index.unwrap_or(existing.order_index);

    let skill = sqlx::query_as::<_, Skill>(
        "UPDATE skills SET name = $1, category = $2, proficiency = $3, icon = $4, order_index = $5 WHERE id = $6 RETURNING *"
    )
    .bind(name)
    .bind(category)
    .bind(proficiency)
    .bind(icon)
    .bind(order_index)
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(skill))
}

pub async fn delete_skill(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM skills WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "Skill not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}
