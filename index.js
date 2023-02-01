const i = require("inquirer");

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
}

initialPrompt();