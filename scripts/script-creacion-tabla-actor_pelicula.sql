create table actor_pelicula(
id int not null auto_increment,
actor_id int,
pelicula_id int,
primary key(id));



-- declaro las foreign key de esta tabla
alter table actor_pelicula add foreign key (pelicula_id) references pelicula(id);

-- despues de crear la tabla actor genero la foreign key 
alter table actor_pelicula add foreign key (actor_id) references actor(id);

