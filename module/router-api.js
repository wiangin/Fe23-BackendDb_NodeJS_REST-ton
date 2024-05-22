import { Router } from "express"; 
import db from "./db.js";

const apiRouter = Router();

apiRouter.get('/students', async (req,res) => {

    const sql = 'SELECT * FROM students';
    const [dbData] = await db.query(sql);
    console.log(dbData);
   
    res.json(dbData);
});

// apiRouter.get('/students/:id', async (req,res) => {

//     const sql = `SELECT * FROM students WHERE id = ${req.params.id}`;
//     const [dbData] = await db.query(sql);
//     console.log(dbData);
//     res.json(dbData);
// });

apiRouter.get('/students/courses', async (req,res) => {

    let sql ='';
    const {id} = req.query;
    if(id){
        sql = `SELECT students.id, students.fName, students.lName, courses.name FROM students JOIN students_courses ON students.id = students_courses.students_id join courses on courses.id = students_courses.courses_id WHERE students.id = ${id};`;
    
    } else{
        sql = 'SELECT * FROM students';
    }
    const [dbData] = await db.query(sql);
   
    res.json(dbData);
});












apiRouter.get('/courses', async (req, res) => {

    const sql = 'SELECT * FROM courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});

apiRouter.get('/studentsCourses', async (req, res) => {

    const sql = 'SELECT * FROM students_courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});


export default apiRouter;