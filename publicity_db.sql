CREATE SCHEMA `publicity` ;

CREATE TABLE bag_color(
id INT PRIMARY KEY NOT NULL,
color VARCHAR(200) 
);

CREATE TABLE size(
id INT PRIMARY KEY NOT NULL,
size VARCHAR(200) 
);

CREATE TABLE ink_color(
id INT PRIMARY KEY NOT NULL,
color VARCHAR(200) 
);

CREATE TABLE ink_color(
id INT PRIMARY KEY NOT NULL,
color VARCHAR(200) 
);

CREATE TABLE status_cart(
id INT PRIMARY KEY NOT NULL,
name VARCHAR(200) 
);

CREATE TABLE user_category(
id INT PRIMARY KEY NOT NULL,
userCategory VARCHAR(200) 
);

CREATE TABLE product_category(
id INT PRIMARY KEY NOT NULL,
productCategory VARCHAR(200) 
);


CREATE TABLE stock(
id INT PRIMARY KEY NOT NULL,
stock INT, 
idBagColor INT,
FOREIGN KEY (idBagColor) REFERENCES publicity.bag_color(id) 
);

CREATE TABLE user(
id INT NOT NULL, 
name VARCHAR(200),
email VARCHAR(200) ,
password VARCHAR(200),
idUserCategory INT,
PRIMARY KEY (id),
FOREIGN KEY (idUserCategory) REFERENCES publicity.user_category(id)
);


CREATE TABLE cart(
id INT NOT NULL, 
delivery VARCHAR(50),
deliveryAdress VARCHAR(200) ,
paymentMethod VARCHAR(200),
total FLOAT,
idUser INT,
idStatus INT,
PRIMARY KEY (id),
FOREIGN KEY (idUser) REFERENCES publicity.user(id),
FOREIGN KEY (idStatus) REFERENCES publicity.status_cart(id)
);

CREATE TABLE product(
id INT NOT NULL, 
name VARCHAR(200),
description VARCHAR(500),
price FLOAT,
image VARCHAR(400),
idStock INT, 
idSize INT,
idProductCategory INT,
idInkColor INT,
PRIMARY KEY (id),
FOREIGN KEY (idStock) REFERENCES publicity.stock(id),
FOREIGN KEY (idSize) REFERENCES publicity.size(id),
FOREIGN KEY (idProductCategory) REFERENCES publicity.product_category(id),
FOREIGN KEY (idInkColor) REFERENCES publicity.ink_color(id)
);

CREATE TABLE product_cart(
id INT NOT NULL, 
amount INT,
idProduct INT,
idCart INT,
PRIMARY KEY (id),
FOREIGN KEY (idProduct) REFERENCES publicity.product(id),
FOREIGN KEY (idCart) REFERENCES publicity.cart(id)
);
