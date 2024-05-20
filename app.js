
import express from 'express';
import ejs from "ejs";
import db from "./module/db.js";
import bodyParser from 'body-parser';
import apiRouter from './module/router-app.js';
import clientRouter from './module/router-client.js';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/', clientRouter);

// app.use(bodyParser.json());


//////// Reuest med endpoint * / * \\\\\\\\\\
//////// Reuest med endpoint * / * \\\\\\\\\\
//////// Reuest med endpoint * / * \\\\\\\\\\
app.get('/', async (req, res) => {
    const pageTitle =   "Grit Academy API";
    const sql = 'SHOW TABLES';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.render('index',{dbData, pageTitle});
});

app.post('/', async (req, res) => {

    const tableName = req.body;
    console.log(tableName.userInput);
    const pageTitle =   "Grit Academy API";

    const sql = `SELECT * FROM ${tableName.userInput}`;
    const [dbData] = await db.query(sql);
    // console.log(dbData);

    const sql2 = `DESCRIBE ${tableName.userInput}`;
    const [dbDataHeaders] = await db.query(sql2);
    // console.log(dbDataHeaders);
    res.render('index',{dbData,pageTitle,dbDataHeaders});
});




//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});
