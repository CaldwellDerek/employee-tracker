const i = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");
const cTable = require('console.table');

// Establishes mysql connection based off of env variables
const db = mysql.createConnection(
	{
		host: 'localhost',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	}
);

// Queries the db to display the id and names from the department table
const viewAllDepartments = () => {
    db.query("SELECT id, name FROM department", (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log("\n");
            console.table(data);
            initialPrompt();
        }
    }); 
};

// Queries the db to display all data from the role table
const viewAllRoles = () => {
    db.query("SELECT * FROM role", (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log("\n");
            console.table(data);
            initialPrompt();
        }
    });
};

// Queries the db to join specified values from the employee and role tables
const viewAllEmployees = () => {
    db.query(
        `SELECT 
            employee.id AS employee_id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            role.department_id, 
            role.salary, 
            employee.manager_id, 
            employee.role_id 
        FROM 
            employee 
        JOIN 
            role 
        WHERE 
            employee.role_id = role.id ORDER BY employee.id`, 
        (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log("\n");
            console.table(data);
            initialPrompt();
        }
    });
};

// Prompts the user for the name of the department to add, queries the db to insert the new department
const addDepartment = async ()=> {

    const getDeptName = await i.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the Department to add: "
        }
    ]);

    db.query(`INSERT INTO department (name) VALUES (?)`, [getDeptName.name], (error) => {
        if (error){
            console.log(error);
        } else {
            console.log(`\nSuccessfully added Department: ${getDeptName.name}`);
            viewAllDepartments();
        }
    });
};

// Prompts the user for the new role information to add, queries the db to insert the new role
const addRole = async () => {

    const getNewRole = await i.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the name of the Role: "
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the role's salary: "
        },
        {
            type: "input",
            name: "department_id",
            message: "Please enter the role's Department ID: "
        }
    ]);

    const {title, salary, department_id} = getNewRole;

    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id], (error) => {
        if (error){
            console.log(error);
        } else {
            console.log(`\nSuccessfully added Role: ${title}`);
            viewAllRoles();
        }
    });
};

// Prompts the user for new employee information, queries the db to insert the new employee into the employee table
const addEmployee = async () => {

    const getNewEmployee = await i.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter the employee's first name: "
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter the employee's last name: "
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter the employee's role id: "
        },
        {
            type: "input",
            name: "manager_id",
            message: "Please enter the id of the employee's manager: "
        }
    ]);

    const {first_name, last_name, role_id, manager_id} = getNewEmployee;

    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id], (error)=> {
        if (error){
            console.log(error);
        } else {
            console.log(`\nSuccessfully added Employee: ${first_name} ${last_name}`);
            viewAllEmployees();
        }
    });
};


// Promisifies a query to the db to retrieve all employee information
const getAllEmployees = () => {
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM employee", (error, results) => {
            if(error){
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
};

// Promisifies a query to the db to retrieve all role information
const getAllRoles = () => {
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM role", (error, results) => {
            if(error){
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
};

// Uses getAllEmployees() and getAllRoles() to populate the arrays used for the choices on the updateEmployeePrompt
// Taking the information from the prompt, the db is queried to update the role of the desired employee
const updateEmployee = async () => {
    const allEmployees = [];
    const allRoles = [];

    const employees = await getAllEmployees();
    if (employees){
        for(let employee of employees){
            allEmployees.push(`${employee.id}`);
        };
    };
    
    const roles = await getAllRoles();
    if (roles){
        for(let role of roles) {
            allRoles.push(role.id);
        };
    };


    const updateEmployeePrompt = await i.prompt([
        {
            type: "list",
            name: "employee",
            message: "Select an employee to update:",
            choices: allEmployees
        },
        {
            type: "list",
            name: "role",
            message: "Select an available role:",
            choices: allRoles
        }
    ]);

    db.query("UPDATE employee SET role_id = ? WHERE id = ?", [updateEmployeePrompt.role ,updateEmployeePrompt.employee], (error)=> {
        if (error){
            console.log(error);
        } else {
            console.log(`\nSuccessfully updated employee with ID: ${updateEmployeePrompt.employee} to Role: ${updateEmployeePrompt.role}`);
            viewAllEmployees();
        }
    })
}

// The initial prompt used at application execution
const initialPrompt = async ()=> {
    const menu = await i.prompt([
        {
            type: "list",
            name: "menuChoice",
            message: "Select from the following:",
            choices: [
                "- View All Departments", 
                "- View All Roles", 
                "- View All Employees", 
                "- Add a Department", 
                "- Add a Role", 
                "- Add An Employee", 
                "- Update an Employee Role"
            ]

        }
    ])

    if (menu.menuChoice == "- View All Departments"){
        viewAllDepartments();
    }

    if (menu.menuChoice == "- View All Roles"){
        viewAllRoles();
    }

    if (menu.menuChoice == "- View All Employees"){
        viewAllEmployees();
    }

    if (menu.menuChoice == "- Add a Department"){
        addDepartment();
    }

    if (menu.menuChoice == "- Add a Role"){
        addRole();
    }

    if (menu.menuChoice == "- Add An Employee"){
        addEmployee();
    }

    if (menu.menuChoice == "- Update an Employee Role"){
        updateEmployee();
    }
}

// Ran at application execution
initialPrompt();