const i = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");
const cTable = require('console.table');

// ----------------------------------------------------

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	}
)

// ----------------------------------------------------

const viewAllDepartments = () => {
    db.query("SELECT id, name FROM department", (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log(`\n\n`);
            console.table(data);
            console.log(`\n\n`);
            initialPrompt();
        }
    }); 
}

// ----------------------------------------------------

const viewAllRoles = () => {
    db.query("SELECT * FROM role", (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log(`\n\n`);
            console.table(data);
            console.log(`\n\n`);
            initialPrompt();
        }
    });
}

// ----------------------------------------------------

const viewAllEmployees = () => {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id FROM employee JOIN role WHERE employee.role_id = role.id", 
        (error, data) => {
        if (error){
            console.log(error);
        } else {
            console.log(`\n\n`);
            console.table(data);
            console.log(`\n\n`);
            initialPrompt();
        }
    });
}

// ----------------------------------------------------

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
            console.log(`\n\n`);
            console.log(`Successfully added Department: ${getDeptName.name}`);
            viewAllDepartments();
        }
    });
}

// ----------------------------------------------------

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
            console.log(`\n\n`);
            console.log(`Successfully added Role: ${title}`);
            viewAllRoles();
        }
    });
}

// ----------------------------------------------------

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
}

initialPrompt();