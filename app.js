
import express from 'express';
import ejs from "ejs";
import db from "./module/db.js";
import bodyParser from 'body-parser';
import apiRouter from './module/router-api.js';
import clientRouter from './module/router-client.js';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/', clientRouter);


//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});
