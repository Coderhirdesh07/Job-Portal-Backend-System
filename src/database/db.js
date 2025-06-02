const mongoose = require('mongoose');

async function connectToDatabase(){
  try{
    const databaseInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log('MongoDb connected');
  }
  catch(error){
    console.log('Mongodb connection failed');
    process.exit(1);
  }
}

module.exports = {connectToDatabase};
