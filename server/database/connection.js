import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/pizza-app';


const connection = async () =>{
    try{
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser:true });
        console.log(`DB Connected...`);
    }catch(err){
        console.log(`Connection error: ${err.message}`);
    }
}

export default connection;