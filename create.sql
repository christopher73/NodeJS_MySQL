/* script to create mysql db and populate it */
drop database if exists bamazon;
CREATE database bamazon;
use bamazon;
CREATE table products (
    ID varchar(90), 
    product_name varchar(90) ,
    deparment_name varchar(90) ,
    price int ,
    stock_quantity int 
);
DESCRIBE products;
INSERT INTO products (ID, product_name, deparment_name, price,stock_quantity)
VALUES  
        ("1ni8miju5032a6", "car",       "Toys & Games",78,3),
        ("1ni8msdu5032a2", "phone",     "Toys & Games",31,3),
        ("1ni8mijuaf3234", "plane",     "Toys & Games",56,113),
        ("1ni8mijuxx32r4", "robot",      "Toys & Games",72,20),
        ("1ni8mijuxc32y6", "dog",      "Toys & Games",5,70),
        ("1ni8miju5032a2", "bicycle",   "Toys & Games",21,603),
        ("1ni8miju503234", "train",     "Toys & Games",56,13),
        ("1ni8miju5032r4", "doll",      "Toys & Games",2,320),
        ("1ni8miju5032y6", "kite",      "Toys & Games",15,703),
        ("1ni8miju5032u7", "airplane" , "Toys & Games",24,203);
SELECT * from products\G;