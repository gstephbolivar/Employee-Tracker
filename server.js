const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
  console.log("connected as id" + connection.threadId);
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

// Function to add a new role
// TODO: Pick a dept to add role into
// function addRole() {
//   connection.query("SELECT * FROM department"),
//     (err, res) => {
//       if (err) throw err;
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "deptId",
//             message: "What is the department this role is in?",
//             choices: function () {
//               const choicesArray = [];
//               for (let i = 0; i < res.length; i++) {
//                 choicesArray.push(res[i].name);
//               }
//               return choicesArray;
//             },
//           },
//           {
//             type: "input",
//             name: "title",
//             message: "What is the role title?",
//           },
//           {
//             type: "input",
//             name: "salary",
//             message: "What is the salary for this role?",
//           },
//         ])
//         .then((userInput) => {
//           console.log(userInput);
//           let chosenItem;
//           for (let i = 0; i < res.length; i++) {
//             if (userInput.choice === res[i].name) {
//               chosenItem = res[i];
//             }
//           }
//           if (userInput.deptID === chosenItem.name) {
//             connection.query(
//               "INSERT INTO role SET ?",
//               {
//                 name: userInput.title,
//                 salary: userInput.salary,
//               },
//               {
//                 department_id: chosenItem.id,
//               },
//               (err, res) => {
//                 if (err) throw err;
//                 console.log(res.affectedRows);
//                 userOptions();
//               }
//             );
//           }
//         });
//     };
// }

// function to add a new employee
function addEmployee() {}

// Function to view all departments
function viewAllDept() {
  connection.query("SELECT name as department FROM department", (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    userOptions();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    userOptions();
  });
}
//   Function to view all employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    userOptions();
  });
}

// Function to update en employee role
function updateEmployeeRole() {}

// When user chooses exit from list of choices, the CLI will end
function exit() {
  connection.end();
}
