USE company_db;

INSERT INTO department (name)
VALUES ("Home Depot"), ("Lowes"), ("Safeway"), ("Subway"), ("Fred Meyer");

INSERT INTO
    role (title, salary, department_id)
VALUES ("Sales", 60000, 1), ("Installation Tech", 80000, 2), ("Prep Cook", 50000, 4), ("Clerk", 45000, 3), ("Produce Attendant", 45000, 5);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("Derek", "Caldwell", 3, 1), ("Bob", "Caldwell", 1, 3), ("Angey", "Caldwell", 1, 3), ("Brandon", "Caldwell", 2, 2), ("Jake", "Caldwell", 5, 4), ("Niko", "Caldwell", 4, 5), ("Mickey", "Caldwell", 4, 5);