import express from 'express';
import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen(3001, () => {
    console.log('The server is running!!');
});

const pgPool = new pg.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
})

connect();

async function connect(){

    try {
        await client.connect(); 
        console.log('Database connected...')
    } catch (error) {
        console.log(error)
    }

}

export {pgPool};
