DROP DATABASE company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE
    department (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30)
    );

CREATE TABLE
    role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL,
        department_id INT,
        CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id) ON UPDATE CASCADE ON DELETE
        SET NULL
    );

CREATE TABLE
    employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INT,
        manager_id INT,
        CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE
        SET NULL
    );