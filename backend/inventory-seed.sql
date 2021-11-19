-- both passwords are the same 'password'
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser', 
        '$2a$13$I.z8ilT2Fr6AgFm0Lustp.C.K0j588loqZU.j86xDMoXivqz9ae/m',
        'Test',
        'User',
        'test@abc.com',
        FALSE),
        ('testadmin',
        '$2a$13$I.z8ilT2Fr6AgFm0Lustp.C.K0j588loqZU.j86xDMoXivqz9ae/m',
        'Test',
        'Admin',
        'admin@abc.com',
        TRUE);

INSERT INTO departments (code, description)
VALUES ('DR1',
        'Food in Dry Storage 1, Located in the Back'),
        ('CO1',
        'Food in Cooler on the Left'),
        ('CO2',
        'Food in Cooler on the Right'),
        ('FRE',
        'Food in the freezer'),
        ('MIS',
        'Other miscellaneous items');

INSERT INTO templates (name, description, created_by)
VALUES ('Dry food template',
        'Template for inventorying dry food',
        2),
        ('Seafood template',
        'Template for inventorying variety of seafood products',
        2);

INSERT INTO user_permissions (user_id, template_id, read, edit, delete)
VALUES (1, 1, TRUE, FALSE, FALSE), (1, 2, TRUE, TRUE, FALSE);

INSERT INTO items (name, unit, description, department)
VALUES ('Sriracha',
        'bottle',
        'Each bottle is 28oz Huy Fond brand', 
        'DR1'),
        ('Clear Frying Oil',
        'box',
        'Each box is 30-35lb',
        'DR1'),
        ('Squid',
        'box',
        'Each box is 15-17 units',
        'FRE'),
        ('Shrimp',
        'box',
        'Size 10-20 and each box is 1kg',
        'FRE'),
        ('Napa Cabbage',
        'box',
        'A 40lb box of Napa Cabbages',
        'CO1'),
        ('Unsalted Butter',
        'bar',
        'JustFarm brand',
        'CO2');

INSERT INTO inventories (title, templated_by, inventory_by)
VALUES ('Inventory Dry Food on 11/25/2021',
        1,
        1),
        ('Inventory Seafood on 11/26/2021',
        2,
        1);

INSERT INTO inventories_items (inventory_id, item_id, quantity)
VALUES (1, 1, 10), (1, 2, 5), (2, 3, 5), (2, 4, 5);


