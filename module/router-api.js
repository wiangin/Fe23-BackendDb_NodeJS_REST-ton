import { Router } from "express"; 
import {pool2 as db} from "./db.js";

const apiRouter = Router();

///// Endpoint students \\\\\
///// Endpoint students \\\\\
///// Endpoint students \\\\\
apiRouter.get('/students', async (req,res) => {

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

apiRouter.get('/students/first_name/:fname', async (req,res) => {

    const sql = `SELECT  students.fName, lName, courses.name FROM students LEFT JOIN students_courses ON students.id = students_courses.students_id LEFT JOIN courses ON courses.id = students_courses.courses_id WHERE students.fName = "${req.params.fname}"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

apiRouter.get('/students/last_name/:lname', async (req,res) => {

    const sql = `SELECT  fName, students.lName, courses.name FROM students LEFT JOIN students_courses ON students.id = students_courses.students_id LEFT JOIN courses ON courses.id = students_courses.courses_id WHERE students.lName = "${req.params.lname}"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

apiRouter.get('/students/town/:town', async (req,res) => {
    
    const sql = `SELECT  students.fName, students.lName, students.town, courses.name FROM students LEFT JOIN students_courses ON students.id = students_courses.students_id LEFT JOIN courses ON courses.id = students_courses.courses_id WHERE students.town = "${req.params.town}"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

///// post request \\\\\
apiRouter.post('/students/:fname/:lname/:town', async (req, res) => {
    const sql = `INSERT INTO students (fName, lName, town) VALUES (?,?,?)`;
    const values = [req.params.fname, req.params.lname, req.params.town];

    const [dbData] = await db.query(sql, values);
    res.json(dbData);
});

///// delete request \\\\\
apiRouter.delete('/students/:id', async (req, res) => {
    const sql = `DELETE FROM students WHERE id = ${req.params.id}`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});



///// Endpoint courses \\\\\
///// Endpoint courses \\\\\
///// Endpoint courses \\\\\

apiRouter.get('/courses', async (req, res) => {
    const sql = `SELECT * FROM courses`;

    const [dbData] = await db.query(sql);
    res.json(dbData);

});

apiRouter.get('/courses/match/name/:match', async (req, res) => {
    const sql = `SELECT * FROM courses WHERE name LIKE "%${req.params.match}%"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);

});

apiRouter.get('/courses/match/description/:match', async (req, res) => {
    const sql = `SELECT * FROM courses WHERE description LIKE "%${req.params.match}%"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);

});

apiRouter.get('/courses/id/:id', async (req, res) => {
    console.log(req.params.id);
    const sql = `SELECT  courses.id, courses.name, courses.description, students.fName, students.lName FROM courses LEFT JOIN students_courses ON courses.id = students_courses.courses_id LEFT JOIN students ON students.id = students_courses.students_id WHERE courses.id = ${req.params.id}`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

apiRouter.get('/courses/name/:name', async (req, res) => {
    console.log(req.params.name);
    const sql = `SELECT  courses.name, students.fName, students.lName FROM courses LEFT JOIN students_courses ON courses.id = students_courses.courses_id LEFT JOIN students ON students.id = students_courses.students_id WHERE courses.name = "${req.params.name}"`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

///// post request \\\\\
apiRouter.post('/courses/:name/:description', async (req, res) => {
    const sql = `INSERT INTO courses (name, description) VALUES (?,?)`;
    const values = [req.params.name, req.params.description];

    const [dbData] = await db.query(sql, values);
    res.json(dbData);
});

///// delete request \\\\\
apiRouter.delete('/courses/:id', async (req, res) => {
    const sql = `DELETE FROM courses WHERE id = ${req.params.id}`;

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

///// Endpoint students and courses \\\\\
///// Endpoint students and courses \\\\\
///// Endpoint students and courses \\\\\
apiRouter.get('/studentsCourses', async (req, res) => {
    const sql = 'SELECT * FROM students_courses';

    const [dbData] = await db.query(sql);
    res.json(dbData);
});

///// post request \\\\\
apiRouter.post('/studentsCourses/:students_id/:courses_id', async (req, res) => {
    const sql = `INSERT INTO students_courses (students_id, courses_id) VALUES (?,?)`;

    const values = [req.params.students_id, req.params.courses_id];
    const [dbData] = await db.query(sql, values);
    res.json(dbData);
});

///// delete request \\\\\
apiRouter.delete('/studentsCourses/:id', async (req, res) => {
    const sql = `DELETE FROM students_courses WHERE id = ${req.params.id}`;
    
    const [dbData] = await db.query(sql);
    res.json(dbData).send('data delete');
});


export default apiRouter;

