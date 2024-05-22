import { Router } from "express";
import db from "./db.js";

const clientRouter = Router();


/////// END POINT */*\\\\\\
/////// END POINT */*\\\\\\
/////// END POINT */*\\\\\\
clientRouter.get('/', async (req, res) => {
    const pageTitle = "Database tables";
    const sql = 'SHOW TABLES';
    const [dbData] = await db.query(sql);
    console.log(dbData);
    res.render('index',{dbData, pageTitle});
});

let currentTable;

clientRouter.post('/', async (req, res) => {
    const tableName = req.body;

    currentTable = tableName.userInput;

    const pageTitle = `Table name = ${tableName.userInput}`; 

    const sql = `Select * FROM ${tableName.userInput} `;
    
    const [dbData] = await db.query(sql);

    const sql2 = `DESCRIBE ${tableName.userInput}`;
    const [dbDataHeaders] = await db.query(sql2);

    res.render('index', {pageTitle, dbData, dbDataHeaders});
    
})


//////// Reuest med endpoint * addData * \\\\\\\\\\
//////// Reuest med endpoint * addData * \\\\\\\\\\
//////// Reuest med endpoint * addData * \\\\\\\\\\
clientRouter.get('/addData', async (req, res) => {
  
    const pageTitle = "Add Data";

    if(currentTable === undefined){
        res.status(400).send('Please choose table');
        return;
    }
    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
    // console.log(dbData);
  
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
  
    res.render('addData', {pageTitle, dbData, dbDataHeaders, currentTable});
  });

  clientRouter.post('/addData', async (req, res) => {

    const pageTitle = `Table name = ${currentTable}`; 

    const tableName = req.body; // with Post need request from body
    console.log(tableName);
  
    const objValues = Object.values(tableName);
    console.log(objValues);
  
    for(const data of objValues){
      console.log(data);
    }
  
    // Query to Mysql \\
    const stringColumn = ["fName", "lName","town", "name","description"];
    const columnNameArr = [];
    const arr = [];

    for(const key in tableName){
      columnNameArr.push(key);
      if(stringColumn.includes(key)){
          arr.push(`"${tableName[key]}"`);
      }
      else{
        arr.push(tableName[key]);
      }
    };
  
    const columnNames = columnNameArr.join(",") //Put comma between values
    console.log(columnNames);
   
      const insertQuery = `INSERT INTO ${currentTable}(${columnNames}) VALUES (${arr.join(",")})`;
      console.log(insertQuery);
      const addDbData = await db.query(insertQuery);
  
    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
    
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
    // console.log(dbDataHeaders);
  
    res.render('addData', {pageTitle, dbData, dbDataHeaders, currentTable});
  });

  //////// Reuest med endpoint * Update Data * \\\\\\\\\\
  //////// Reuest med endpoint * Update Data * \\\\\\\\\\
  //////// Reuest med endpoint * Update Data * \\\\\\\\\\
  clientRouter.get('/updateData', async (req, res) => {
  
    const pageTitle = "Update Data";

    if(currentTable === undefined){
        res.status(400).send('Please choose table');
        return;
    }
    
    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
    // console.log(dbData);
  
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
  
    res.render('updateData', {pageTitle, dbData, dbDataHeaders, currentTable});
  });

  clientRouter.post('/updateData', async (req, res) => {
    const pageTitle = "Update Data";
    const request = req.body;

    if(request.column_name === 'id'){

        res.status(400).send('Caonnot use Id to update');
        return;
    }
    else{
        const updateQuery = `UPDATE ${currentTable} SET ${request.column_name} = "${request.new_value}" WHERE id = ${request.id}`;
        const updateData = await db.query(updateQuery);
    }

    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
    // console.log(dbData);
  
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
  
    res.render('updateData', {pageTitle, dbData, dbDataHeaders, currentTable});
  });

//////// Reuest med endpoint * removeData * \\\\\\\\\\
//////// Reuest med endpoint * removeData * \\\\\\\\\\
//////// Reuest med endpoint * removeData * \\\\\\\\\\

clientRouter.get('/removeData', async (req, res) => {
    //res.send("hello World");//serves index.html
    const pageTitle = "Remove Data";

    if(currentTable === undefined){
        res.status(400).send('Please choose table');
        return;
    }

    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
    // console.log(dbData);
  
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
  
    res.render('removeData', {pageTitle, dbData, dbDataHeaders, currentTable});
  });
   
  clientRouter.post('/removeData', async (req, res) => {
    // console.log(req.body);
    const pageTitle = "Remove Data";
    const tableName = req.body;
  
    const sqlDeleteQuery = `DELETE FROM ${currentTable} WHERE id = ${tableName.id}`;
    const deleteQuery = await db.query(sqlDeleteQuery);
    // console.log(deleteQuery);
  
    const sql = `SELECT * FROM ${currentTable}`;
    const [dbData] = await db.query(sql);
  
    const sql2 = `DESCRIBE ${currentTable}`;
    const [dbDataHeaders] = await db.query(sql2);
  
    res.render("removeData", {pageTitle, dbData, dbDataHeaders, currentTable});
  });


export default clientRouter;