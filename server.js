const inquirer = require("inquirer");

const mysql = require("mysql");
const { allowedNodeEnvironmentFlags } = require("process");

// Creating the variable for the database in mysql workbench
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Flounder91!",
  database: "employeetracker_db",
});

// Connecting to mysql
connection.connect((err) => {
  if (err) throw err;
  // TODO: prompt the user for their next action.
  userOptions();
});

// Function to prompt user what they would like to do
function userOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
          "Add a new Department",
          "Add a new Role",
          "Add a new Employee",
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then(({ selection }) => {
      switch (selection) {
        case "Add a new Department":
          addDept();
          break;
        case "Add a new Role":
          addRole();
          break;
        case "Add a new Employee":
          addEmployee();
          break;
        case "View All Departments":
          viewAllDept();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          exit();
        default:
          console.log("Have a great day!");
      }
    });
}

// Function to add a new Department
function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "deptname",
          message: "What is the name of the department?",
        },
      ])
      .then((userInput) => {
        console.log(userInput);
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: userInput.deptname,
          },
          (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows);
            userOptions();
          }
        );
      });
  }

// Function to view all departments
function viewAllDept() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    userOptions();
  });
}

// When user chooses exit from list of choices, the CLI will end
function exit() {
  connection.end();
}
