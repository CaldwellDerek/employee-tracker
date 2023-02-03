USE company_db;

INSERT INTO department (name)
VALUES ("Home Depot"), ("Lowes"), ("Safeway"), ("Subway"), ("Fred Meyer");

INSERT INTO
    role (title, salary, department_id)
VALUES 
    ("Sales", 60000, 1),
    ("Installation Tech", 80000, 1), 
    ("Clerk", 45000, 1), 
    ("Stock Associate", 50000, 1), 
    ("Paint Specialist", 45000, 1),
    ("Management", 90000, 1);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES 
    ("Derek", "Caldwell", 6, NULL), 
    ("Bob", "Caldwell", 1, 1), 
    ("Angey", "Caldwell", 1, 1), 
    ("Brandon", "Caldwell", 2, 1), 
    ("Jake", "Caldwell", 4, 1), 
    ("Niko", "Caldwell", 4, 1), 
    ("Mickey", "Caldwell", 1, 1);