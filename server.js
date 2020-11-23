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

// Function that creates an array of the departments to be called in addRole(); for user to choose
function deptChoice() {
  let department = [];
  connection.query("SELECT name FROM department", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      department.push(res[i].name);
    }
  });
  return department;
}

// Function to add a new role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is title of this position?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this position?",
      },
      {
        type: "list",
        name: "deptchoice",
        message: "What department would you like to add this role to?",
        choices: deptChoice(),
      },
    ])
    .then((userInput) => {
      console.log(userInput);
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: userInput.title,
          salary: userInput.salary,
          department_id: userInput.deptChoice,
        },
        (err, res) => {
          if (err) throw err;
          // console.log("You did it!");
        }
      );
      userOptions();
    });
}

function roleChoice() {
    let role = [];
    connection.query("SELECT title FROM role", (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        role.push(res[i].title);
      }
    });
    return role;
  }

// function to add a new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "rolechoice",
        message: "What role does this employee have?",
        choices: roleChoice(),
      },
      // {
      //     insert manager id here
      // },
    ])
    .then((userInput) => {
      console.log(userInput);
      connection.query("INSERT INTO employee SET ?",
       {
        first_name: userInput.firstname,
        last_name: userInput.lastname,
        role_id: userInput.rolechoice,
      }),
        (err, res) => {
          if (err) throw err;
        };
      userOptions();
    });
}

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
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    userOptions();
  });
}
//   Function to view all employees
function viewEmployees() {
  // TODO: Figure out how to include a manager in here
  connection.query(
    "SELECT employee.id, first_name, last_name, role.title, department.name AS department, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      userOptions();
    }
  );
}

// Function to update en employee role
function updateEmployeeRole() {}

// When user chooses exit from list of choices, the CLI will end
function exit() {
  connection.end();
}

