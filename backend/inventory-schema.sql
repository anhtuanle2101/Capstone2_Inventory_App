CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE user_permissions (    
    user_id INTEGER REFERENCES users.id ON DELETE CASCADE,
    template_id INTEGER REFERENCES templates.id ON DELETE CASCADE,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    edit BOOLEAN NOT NULL DEFAULT FALSE,
    delete BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, template_id)
);

CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    create_by INTEGER REFERENCES users.id ON DELETE CASCADE
)

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    unit VARCHAR(10) NOT NULL,
    description TEXT,
    department VARCHAR(3) REFERENCES departments.code ON DELETE CASCADE
)

CREATE TABLE departments (
    department VARCHAR(3) PRIMARY KEY,
    description TEXT
)

CREATE TABLE inventories (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    description TEXT,
    inventory_date DATETIME NOT NULL DEFAULT NOW(),
    complete_flag BOOLEAN NOT NULL DEFAULT FALSE,
    templated_by REFERENCES templates.id ON DELETE CASCADE,
    inventory_by REFERENCES user.id ON DELETE CASCADE
)

CREATE TABLE inventories_items (
    inventory_id REFERENCES inventories.id ON DELETE CASCADE,
    item_id REFERENCES items.id ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(inventory_id, item_id)
)