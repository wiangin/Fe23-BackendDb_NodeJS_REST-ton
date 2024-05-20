import { Router } from "express"; 
import db from "./db.js";

const apiRouter = Router();

apiRouter.get('/student', async (req,res) => {

    const sql = 'SELECT * FROM students';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});

export default apiRouter;