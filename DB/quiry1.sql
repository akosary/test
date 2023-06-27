create database ecommerceWebsite;
create table product_type (`Id` int primary key auto_increment , `type` ENUM ('DVD','Furniture','Book'), `size` int unsigned, `height` float unsigned,`width` float unsigned,`length` float unsigned,`weight` float unsigned);
CREATE TABLE products (
    `SKU` VARCHAR(50) PRIMARY KEY ,
    `name` VARCHAR(50),
    `price` FLOAT,
    `type_id` INT,
	FOREIGN KEY (type_id) REFERENCES product_type(Id)ON DELETE CASCADE
);

CREATE USER 'kosary'@'localhost' IDENTIFIED BY '123';

GRANT ALL PRIVILEGES ON ecommerceWebsite.* TO 'kosary'@'localhost';

Insert into product_type(`type`,`size`,`height`,`width`,`length`,`weight`) value('Book',0,0,0,0,300)


Insert into products(`SKU`,`name`,`price`,`type_id`) value(706,'book3',400,6)
