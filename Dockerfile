# Multi-stage build for optimized production image

# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tailwind.config.js tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY static ./static
COPY templates ./templates

# Build CSS and JavaScript
RUN npm run build:frontend

# Stage 2: Build Rust application
FROM rust:slim AS rust-builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y pkg-config libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy Cargo files
COPY Cargo.toml Cargo.lock ./

# Copy source code
COPY src ./src
COPY migrations ./migrations

# Build release binary
RUN cargo build --release

# Stage 3: Runtime image
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates libssl3 && \
    rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=rust-builder /app/target/release/angel-portfolio /app/angel-portfolio

# Copy templates
COPY templates ./templates

# Copy migrations
COPY migrations ./migrations

# Copy built frontend assets from frontend-builder
COPY --from=frontend-builder /app/static ./static

# Set environment
ENV RUST_LOG=info
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose port
EXPOSE 8080

# Run the application
CMD ["/app/angel-portfolio"]
