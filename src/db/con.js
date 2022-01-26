import 'dotenv/config'
import mongoose  from 'mongoose';


        const dbname = process.env.DB_NAME
        const con = `${process.env.DB_URL}`;
        console.log('wait database connected......');

        mongoose.connect(con, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log("MongoDB database connection established successfully");
        })

