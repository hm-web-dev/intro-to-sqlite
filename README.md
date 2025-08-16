# Intro to SQLite
This repo provides a very basic template for using `sqlite` with `express`. 

## Startup 
To get started and poke around the package, first install the dependencies:
```bash
npm i
```

Run the following command to start the server:
```bash
npm run test
```
which will run `nodemon` on `index.ts`.

## Assignment
Write the rest of the missing endpoints in `index.ts` to create a simple backend for a CRUD app.  This will require you to write code in `db.ts` as well!

The [documentation for sqlite3](https://github.com/mapbox/node-sqlite3/wiki/API) will be very helpful.

Make sure that you return the correct HTTP status code as well.

### index.ts
Most of this file should look familiar. Look at past assignments to review what each section of this file does.

You can ignore the middleware code -- at a very basic level, this code allows us to test our front end later on in this course.

### db.ts
The database `foo.db` contains one table named `user`.

Use DB Browser to explore this database before you write any code!
