const express = require('express');
require('dotenv').config() //VARIABLE DE ENTORNO
const {dbConnection} = require('./database/config'); //Importacion del config de mongoDB
const cors = require('cors')
//* Crear el servidor con express
const app = express();

//*Conexion a base de datos
dbConnection();

//*CORS
app.use(cors());

//*Mostrar directorio publico
app.use( express.static('public') );//LLegamos al archivo html & css


//*Lectura y parseo del body
app.use(express.json());

//*RUTAS 
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
//TODO CRUD: eventos



//*Escuchar las peticiones
app.listen(process.env.PORT,()=>{ //Configuramos el puerto
    console.log(`Servidor en puerto ${process.env.PORT}`);
})