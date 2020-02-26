create table genero(
id int not null auto_increment,
nombre varchar(30),
primary key(id));
-- luego de generar la tabla, se inserta la columna foreign key en la tabla pelicula

alter table pelicula add column genero_id int;
alter table pelicula add foreign key (genero_id) references genero(id);