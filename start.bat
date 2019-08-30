echo off

SET DB_USER=postgres
SET DB_PASSWORD=abcd1234
SET DB_HOST=localhost
SET DB_PORT=5432
SET DB_SCHEMA=postgres

SET PORT=8000

SET SECRET_KEY=mysecretkey

call npm run server