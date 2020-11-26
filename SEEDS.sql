INSERT INTO department(name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal");


SELECT * FROM department;

INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 105000, 1),("Sales Lead", 90000, 2),("Head Accountant", 85000, 3),("Legal Team Lead", 95000, 4);

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 85000, 1);

SELECT * FROM role;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Stephany", "Bolivar", 1, null),("Andrew", "Benson", 2, null),("Su", "Morton", 3, null),("Alli", "Green", 4, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Addie", "Lasher", 1, 1);

SELECT * FROM employee;

SELECT employee.id, first_name, last_name, role.title, department.name AS department, role.salary, manager_id FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;