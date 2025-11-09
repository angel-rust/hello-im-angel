use axum::{
    extract::State,
    response::{Html, IntoResponse},
    Form,
};
use sqlx::PgPool;
use validator::Validate;

use crate::{models::CreateContactMessage, AppState};

pub async fn submit_contact(
    State(state): State<AppState>,
    Form(form): Form<CreateContactMessage>,
) -> impl IntoResponse {
    // Validate input
    if let Err(e) = form.validate() {
        let error_msg = format!("Validation error: {:?}", e);
        return Html(format!(
            r#"<div class="text-red-500 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p class="font-medium">❌ {}</p>
            </div>"#,
            error_msg
        ));
    }

    // Insert into database
    match insert_contact_message(&state.db, form).await {
        Ok(_) => Html(
            r#"<div class="text-green-500 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p class="font-medium">✅ Message sent successfully!</p>
                <p class="text-sm text-gray-30 mt-2">I'll get back to you soon.</p>
            </div>"#
                .to_string(),
        ),
        Err(e) => {
            tracing::error!("Failed to insert contact message: {}", e);
            Html(format!(
                r#"<div class="text-red-500 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p class="font-medium">❌ Failed to send message</p>
                    <p class="text-sm text-gray-30 mt-2">Please try again later or email me directly.</p>
                </div>"#
            ))
        }
    }
}

async fn insert_contact_message(
    db: &PgPool,
    form: CreateContactMessage,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        INSERT INTO contact_messages (name, email, message)
        VALUES ($1, $2, $3)
        "#,
    )
    .bind(form.name)
    .bind(form.email)
    .bind(form.message)
    .execute(db)
    .await?;

    Ok(())
}
