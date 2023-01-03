//recibimos lo exportado de app.js
const app = require('./app')
//puerto en el que escucha  
app.listen(app.get('port'));
console.log('server on port',app.get('port'));
