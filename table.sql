create table users(
	email varchar(30) primary key,
	firstname varchar(30) not null,
	lastname varchar(30),
	password varchar(10) not null,
	role varchar(5) default 'USER'
);

insert into users(email, firstname, password) values ('abc@gmail.com', 'abc', 'abc123');