const express = require('express');

const config = require('./server/config');

//DATABASE
require('./database');

const app = config(express());

//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});



//Comando para correr el servidor: npm run dev (node src/index.js)
//Comando para correr base de datos: mongod
 

//Comando para correr la base de datos: mongod

//Hora 5 Min 4



