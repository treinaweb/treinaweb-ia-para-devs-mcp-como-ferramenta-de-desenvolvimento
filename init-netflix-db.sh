#!/bin/bash
set -e

echo "Creating Netflix database..."

# Create the netflix database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE netflix;
EOSQL

# Run the SQL script to populate the netflix database
echo "Loading Netflix data from /postgres-sample-dbs/netflix.sql..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "netflix" -f /postgres-sample-dbs/netflix.sql

echo "Netflix database initialized successfully!"
