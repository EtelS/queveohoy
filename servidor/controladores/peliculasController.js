var con = require('../lib/conexionbd');

function mostrarPeliculas(req, res){//esto solo muestra las peliculas en pantalla
    let pagina=Number( req.query.pagina);
    let cantidad= Number(req.query.cantidad);
    let titulo= req.query.titulo;
    let genero= req.query.genero;
    let anio = req.query.anio;
    let columna_orden= req.query.columna_orden; //titulo, anio o genero
    let tipo_orden= req.query.tipo_orden;
    let paginacion = (pagina - 1) * cantidad;

    let sql= "select * from pelicula";
    let where ="";

    if (titulo){
        where= " titulo like '%"+titulo+"%'";
    }
    if (genero){
        if (titulo){
            where= where+" and genero_id = "+genero;
        }
        where= " genero_id = " + genero
    }
    if (anio){
        if (genero|| titulo){
            where = where+" and anio =  "+anio;
        }
        where = " anio = "+anio;
    }
    if (where){
        sql= sql+" where "+where;
    }
    sql= sql+" order by "+columna_orden+" "+tipo_orden;
    if (cantidad) {
        sql += " limit "+ cantidad +" offset "+paginacion;
    }

    con.query(sql, function(error, resultado, fields){
        if (error){
            console.log("Hubo un error en la consulta ", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length==0){
            console.log("No se encontró ninguna pelicula con los filtros propuestos");
            return res.status(404).send("No se encontró ninguna pelicula con los filtros propuestos");
        }else{
            let response= {
                'peliculas':resultado,
                'total': resultado[0].total
            };
            res.send(response);
        }
    })

}

function mostrarGeneros(req, res){
    let sql= "select * from genero"
    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        let response = {
            'generos':resultado
        };
        res.send(response);
    });
}

function obtenerPelicula(req, res){ 
    let id = req.params.id;
    var sql = "select p.titulo, p.duracion, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion,p.poster, p.trama, a.nombre as actores, g.nombre from pelicula p join genero g on p.genero_id=g.id join actor_pelicula ac on p.id= ac.pelicula_id join actor a on ac.actor_id= a.id where p.id="+id
    con.query (sql, function(error, resultado, fields){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length==0){
            console.log("No se encontro ninguna pelicula con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        } else{
            var response= {
                'peliculas': resultado[0],
                'actores': resultado,
                'genero': resultado[0].nombre,
            };
 
            res.send(response);
        }
    });
       
}
function recomendarPelicula(req, res){
    let genero= req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin= req.query.anio_fin;
    let puntuacion= req.query.puntuacion;
    let sql= 'select p.id, p.poster, p.trama, p.titulo, g.nombre from pelicula p inner join genero g on p.genero_id= g.id';
    let where=""

    if (genero){
        where += ' where g.nombre = "'+genero+ '" ';
    }
    if (anio_inicio){
        if (genero){
            where +=' and p.anio between '+anio_inicio+' and '+anio_fin;
         }
    }
        if (puntuacion){
            if(genero||anio_inicio){
                where+=' and p.puntuacion= '+puntuacion
            }

            where += ' where p.puntuacion='+puntuacion;
    }

     sql+=where;

    con.query(sql, function(error, resultado, fields){
        if (error){
            console.log("Hubo un error en la consulta ", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }else{
            let response= {
                'peliculas':resultado
            };
            res.send(response);
        }
    })


}

module.exports={
    mostrarPeliculas,
    mostrarGeneros,
    obtenerPelicula,
    recomendarPelicula
}