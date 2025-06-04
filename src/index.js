const app = require('./app.js');
const {connectToDatabase} = require('./database/db.js');

connectToDatabase();

app.listen(process.env.PORT,()=>{
    console.log("Server Started at port");
});

