CREATE SCHEMA `publicity` ;

CREATE TABLE bag_colors(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
color VARCHAR(200) 
);

CREATE TABLE bag_sizes(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
size VARCHAR(200) 
);

CREATE TABLE status_carts(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(200) 
);

CREATE TABLE user_categorys(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
userCategory VARCHAR(200) 
);

CREATE TABLE product_categorys(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
productCategory VARCHAR(200) 
);


CREATE TABLE stock(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
stock INT, 
idBagColor INT,
FOREIGN KEY (idBagColor) REFERENCES publicity.bag_colors(id) 
);

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR(200),
email VARCHAR(200) ,
password VARCHAR(200),
idUserCategory INT,
PRIMARY KEY (id),
FOREIGN KEY (idUserCategory) REFERENCES publicity.user_categorys(id)
);


CREATE TABLE carts(
id INT NOT NULL AUTO_INCREMENT, 
delivery VARCHAR(50),
deliveryAdress VARCHAR(200) ,
paymentMethod VARCHAR(200),
total FLOAT,
idUser INT,
idStatus INT,
PRIMARY KEY (id),
FOREIGN KEY (idUser) REFERENCES publicity.users(id),
FOREIGN KEY (idStatus) REFERENCES publicity.status_carts(id)
);

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR(200),
description VARCHAR(500),
price FLOAT,
image VARCHAR(400),
idStock INT, 
idSize INT,
idProductCategory INT,
PRIMARY KEY (id),
FOREIGN KEY (idStock) REFERENCES publicity.stock(id),
FOREIGN KEY (idSize) REFERENCES publicity.bag_sizes(id),
FOREIGN KEY (idProductCategory) REFERENCES publicity.product_categorys(id)
);

CREATE TABLE product_carts(
id INT NOT NULL AUTO_INCREMENT, 
amount INT,
idProduct INT,
idCart INT,
PRIMARY KEY (id),
FOREIGN KEY (idProduct) REFERENCES publicity.products(id),
FOREIGN KEY (idCart) REFERENCES publicity.carts(id)
);


