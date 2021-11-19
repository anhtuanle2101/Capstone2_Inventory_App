\echo "Delete and recreate inventory db?"
\promt "Any key for yes or control-C to cancel > " foo

DROP DATABASE inventory;
CREATE DATABASE inventory;
\connect inventory

\i inventory-schema.sql
\i inventory-seed.sql

\echo "Delete and recreate inventory_test db? > " foo

DROP DATABASE inventory_test;
CREATE DATABASE inventory_test;
\connect inventory_test

\i inventory-schem.sql
