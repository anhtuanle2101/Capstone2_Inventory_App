\echo "Delete and recreate inventory db?"
\prompt "Any key for yes or control-C to cancel > " foo

DROP DATABASE inventory;
CREATE DATABASE inventory;
\c inventory

\i inventory-schema.sql
\i inventory-seed.sql

\echo "Delete and recreate inventory_test db?"
\prompt "Any key for yes or control-C to cancel > "foo

DROP DATABASE inventory_test;
CREATE DATABASE inventory_test;
\c inventory_test

\i inventory-schema.sql

\quit


