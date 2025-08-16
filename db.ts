//-----------------------------
//#region Database Connection
//-----------------------------
import path from "path";
import {Request, Response} from 'express';
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
const dbFile = process.env.DB_PATH ?? 'foo.db';
// below is the line for vanilla ES6 js to work; not necessary with typescript
// const dbFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "foo.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.error(error.message);
  console.log(`Connected to database ${dbFile}`);
});

//#endregion Database Connection

//-----------------------------
//#region Routes
//-----------------------------
/**
 * Gets a single user by id
 */
export const getUserById = (request: Request, response: Response) => {
  // Parse the id to generate a SQLite query
  const id = parseInt(request.params.id);
  const query = `SELECT * FROM user WHERE id = ?`;

  // db.get will replace all ? in query sequentially with
  // items from the array passed as the second parameter
  // and then run the callback function passed as the third param
  // What does the callback function do?
  db.get(query, [id], (error, result) => {
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  });
};

// ----- FILL IN BELOW -----
// Write and export the rest of the functions needed by index.js!
const createNewUser = (request: Request, response: Response) => {
  const name = request.body.name;

  // problems with db.exec() - doesn't sanitize if using exec() 
  // const createQuery = `INSERT INTO user(name) VALUES (${name})`
  // what if someone sent in Robert'); CREATE TABLE Person (PersonID Int);
  // or worse... DROP TABLE user; ?  
  // but can use db.run() to get the lastID to get the lastID inserted
  const createQuery = "INSERT INTO user(name) VALUES (?)"
  db.run(createQuery, [name], function (error) {
    // create doesn't return anything 
    error ? response.json({ error: error.message }) :
      response.json({ result: "row id: " + this.lastID });
  });
};