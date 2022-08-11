CREATE SCHEMA `publicity` ;

CREATE TABLE bag_colors(
id INT PRIMARY KEY NOT NULL,
color VARCHAR(200) 
);

CREATE TABLE bag_sizes(
id INT PRIMARY KEY NOT NULL,
size VARCHAR(200) 
);

CREATE TABLE ink_colors(
id INT PRIMARY KEY NOT NULL,
color VARCHAR(200) 
);


CREATE TABLE status_carts(
id INT PRIMARY KEY NOT NULL,
name VARCHAR(200) 
);

CREATE TABLE user_categorys(
id INT PRIMARY KEY NOT NULL,
userCategory VARCHAR(200) 
);

CREATE TABLE product_categorys(
id INT PRIMARY KEY NOT NULL,
productCategory VARCHAR(200) 
);


CREATE TABLE users(
id INT NOT NULL, 
name VARCHAR(200),
email VARCHAR(200) ,
password VARCHAR(200),
idUserCategory INT,
PRIMARY KEY (id),
FOREIGN KEY (idUserCategory) REFERENCES publicity.user_categorys(id)
);


CREATE TABLE carts(
id INT NOT NULL, 
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
id INT NOT NULL, 
name VARCHAR(200),
description VARCHAR(500),
price FLOAT,
image VARCHAR(400),
idStock INT, 
idProductCategory INT,
idInkColor INT,
PRIMARY KEY (id),
FOREIGN KEY (idSize) REFERENCES publicity.bag_sizes(id),
FOREIGN KEY (idProductCategory) REFERENCES publicity.product_categorys(id),
FOREIGN KEY (idInkColor) REFERENCES publicity.ink_colors(id)
);


CREATE TABLE stock(
id INT PRIMARY KEY NOT NULL,
stock INT, 
idBagColor INT,
idProduct INT,
FOREIGN KEY (idBagColor) REFERENCES publicity.bag_colors(id),
FOREIGN KEY (idProduct) REFERENCES publicity.products(id) 
);

CREATE TABLE product_carts(
id INT NOT NULL, 
amount INT,
idProduct INT,
idCart INT,
PRIMARY KEY (id),
FOREIGN KEY (idProduct) REFERENCES publicity.products(id),
FOREIGN KEY (idCart) REFERENCES publicity.carts(id)
);
