use sqlx::{postgres::PgPoolOptions, Pool, Postgres, Error as SqlxError};
use std::time::Duration;

pub type DbPool = Pool<Postgres>;

pub async fn create_pool(database_url: &str) -> Result<DbPool, SqlxError> {
    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .connect(database_url)
        .await
}

pub async fn run_migrations(pool: &DbPool) -> Result<(), SqlxError> {
    sqlx::migrate!("./migrations")
        .run(pool)
        .await
}
