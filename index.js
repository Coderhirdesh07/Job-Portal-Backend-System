const app = require('./app.js');
const {connectToDatabase} = require('./database/db.js');

connectToDatabase();
app.listen(3000,()=>{
    console.log("Server Started at port");
});
