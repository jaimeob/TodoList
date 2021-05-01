const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const App = require('./app/app');

const cors = require('cors')
App.use(cors())


Database.connect();

App.listen(CONFIG.PORT,function(error){
    if (error) return console.log(error);
        console.log(`Servidor corriendo al 100 pa!:${CONFIG.PORT}`);
    
});