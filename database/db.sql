CREATE DATABSE company;
USE company;

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    brithday DATE NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY(id) 
)