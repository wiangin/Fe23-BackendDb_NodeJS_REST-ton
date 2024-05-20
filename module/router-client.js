import { Router } from "express";
import db from "./db.js";

const clientRouter = Router();

clientRouter.get('/studentTable', async (req,res) => {
    const pageTitle =   "Grit Academy API";
    const sql = 'SELECT * FROM students';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE students';
    const [dbDataHeaders] = await db.query(sql2)
    res.render('studentTable',{dbData, pageTitle, dbDataHeaders});
});

clientRouter.get('/courseTable', async (req, res) => {
    const pageTitle =   "Grit Academy API";
    const sql = 'SELECT * FROM courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE courses';
    const [dbDataHeaders] = await db.query(sql2);
    console.log(dbDataHeaders);
    res.render('studentTable',{dbData, pageTitle, dbDataHeaders});
})

export default clientRouter;