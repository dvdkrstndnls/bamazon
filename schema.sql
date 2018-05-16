DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(100) DEFAULT NULL,
  department_name varchar(100) DEFAULT NULL,
  price decimal(13,2) DEFAULT NULL,
  stock_quantity decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (item_id)
); 

SELECT * FROM products; 
