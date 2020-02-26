var con = require('../lib/conexionbd');

function mostrarPeliculas(req, res){//esto solo muestra las peliculas en pantalla
    let titulo= req.query.titulo;
    let genero= req.query.genero;
    let anio = req.query.anio;
    let columna_orden= req.query.columna_orden; //titulo, anio o genero
    let tipo_orden= req.query.tipo_orden;

    let sql= "select * from pelicula";
    let where ="";

    if (titulo){
        where= " titulo like '%"+titulo+"%'";
        console.log('titulo: ', where);
    }
    if (genero){
        if (titulo){
            where= where+" and genero_id = "+genero;
            console.log("where con titulo + genero: ", where);
        }
        where= " genero_id = " + genero
        console.log("where sin titulo con genero: ", where);
    }
    if (anio){
        if (genero|| titulo){
            where = where+" and anio =  "+anio;
            console.log("where con genero o titulo + anio: ", where);
        }
        where = " anio = "+anio;
        console.log("where son genero o titulo + anio: ", where);
    }
    if (where){
        sql= sql+" where "+where;
        console.log("sql con where: ", sql);
    }
    sql= sql+" order by "+columna_orden+" "+tipo_orden+" limit 0,25;";

    console.log("sql final: ", sql);

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
                'peliculas':resultado
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
    var sql = "select * from pelicula where id= "+id;
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
                'peliculas': resultado[0].titulo
            };
            res.send(response);
        }
    });
       
}

module.exports={
    mostrarPeliculas,
    mostrarGeneros,
    obtenerPelicula
}