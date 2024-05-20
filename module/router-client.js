import { Router } from "express";
import db from "./db.js";

const clientRouter = Router();


/////// END POINT */*\\\\\\
/////// END POINT */*\\\\\\
/////// END POINT */*\\\\\\
clientRouter.get('/', async (req, res) => {
    const pageTitle =   "Grit Academy API";
    const sql = 'SHOW TABLES';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.render('index',{dbData, pageTitle});
});


/////// END POINT *studentTable*\\\\\\
/////// END POINT *studentTable*\\\\\\
/////// END POINT *studentTable*\\\\\\
clientRouter.get('/studentTable', async (req,res) => {
    const pageTitle =   "Grit Academy API";
    const sql = 'SELECT * FROM students';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE students';
    const [dbDataHeaders] = await db.query(sql2);
    res.render('studentTable',{dbData, pageTitle, dbDataHeaders});
});

clientRouter.post('/studentTable', async (req,res) => {
    const pageTitle = "Grit Academy API";
    const userInput = req.body;
    console.log(userInput);

    const insertQuery = `INSERT INTO students (fName, lName, town) VALUES ("${userInput.fName}","${userInput.lName}","${userInput.town}")`;
    const addData = await db.query(insertQuery);

    const sql = 'SELECT * FROM students';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE students';
    const [dbDataHeaders] = await db.query(sql2);
    res.render('studentTable', {dbData, pageTitle, dbDataHeaders});
});

/////// END POINT *courseTable*\\\\\\
/////// END POINT *courseTable*\\\\\\
/////// END POINT *courseTable*\\\\\\
clientRouter.get('/courseTable', async (req, res) => {
    const pageTitle = "Grit Academy API";
    const sql = 'SELECT * FROM courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE courses';
    const [dbDataHeaders] = await db.query(sql2);
    console.log(dbDataHeaders);
    res.render('courseTable',{dbData, pageTitle, dbDataHeaders});
})

clientRouter.post('/courseTable', async (req,res) => {
    const pageTitle = "Grit Academy API";
    const userInput = req.body;
    console.log(userInput);

    const insertQuery = `INSERT INTO courses (name, description) VALUES ("${userInput.name}","${userInput.description}")`;
    const addData = await db.query(insertQuery);

    const sql = 'SELECT * FROM Courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE courses';
    const [dbDataHeaders] = await db.query(sql2);
    res.render('courseTable', {dbData, pageTitle, dbDataHeaders});
});

/////// END POINT *studentsAndCourses*\\\\\\
/////// END POINT *studentsAndCourses*\\\\\\
/////// END POINT *studentsAndCourses*\\\\\\

clientRouter.get('/studentsAndCourses', async (req, res) => {
    const pageTitle = "Grit Academy API";
    const sql = 'SELECT * FROM students_courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE students_courses';
    const [dbDataHeaders] = await db.query(sql2);
    console.log(dbDataHeaders);
    res.render('studentsAndCourses',{dbData, pageTitle, dbDataHeaders});
});

clientRouter.post('/studentsAndCourses', async (req,res) => {
    const pageTitle = "Grit Academy API";
    const userInput = req.body;
    console.log(userInput);

    const insertQuery = `INSERT INTO students_courses (students_id, courses_id) VALUES (${userInput.students_id}, ${userInput.courses_id})`;
    const addData = await db.query(insertQuery);

    const sql = 'SELECT * FROM students_courses';
    const [dbData] = await db.query(sql);
    console.log(dbData);

    const sql2 = 'DESCRIBE students_courses';
    const [dbDataHeaders] = await db.query(sql2);
    res.render('studentsAndCourses', {dbData, pageTitle, dbDataHeaders});
});



export default clientRouter;