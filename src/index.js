const app = require('./app'); //carga el módulo app desde app.js

// app.listen -> pone en marcha el servidor en un puerto específico, lo que permite que la aplicación comience a recibir peticiones HTTP.
// app.get('port') -> obtiene el valor de la configuración 'port' del objeto app, que debe haber sido definido previamente. Este valor indica el puerto en el que el servidor debe escuchar.
//console.log("...") -> Dentro del callback (la función que se pasa como segundo argumento a app.listen()), esta línea se ejecuta una vez que el servidor ha comenzado a escuchar en el puerto especificado.

app.listen(app.get('port'), () => { 
    console.log("Servidor escuchando en el puerto ", app.get("port"))
})