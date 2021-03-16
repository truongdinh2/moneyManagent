const sqlite = require('sqlite');
      const sqlite3 = require('sqlite3')
    const {open} = require('sqlite')

       async function openDB (){
    return open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    })
}


async function setup(){
    const db = await openDB();
    await db.migrate({force : 'last'});
}

setup();
// const sqlite3 = require('sqlite3');
// const sqlite = require('sqlite');

// async function openDb() {
//   return sqlite.open({
//     filename: './database.db',
//     driver: sqlite3.Database,
//   });
// }

// async function setup() {
//   const db = await openDb();
//   await db.migrate(
//                     { 
//                       migrationsPath: './src/migrations', //add cutom path to your migrations
//                       force: 'last' 
//                     }
//                   );

//   const people = await db.all('SELECT * FROM Person');
//   console.log('all person', JSON.stringify(people, null, 2));

//   const vehicle = await db.all(`SELECT a.*, b.* FROM Person as a
//   LEFT JOIN Vehicle as b
//   ON a.id = b.ownerId
//   `);
//   console.log('all vehicles', JSON.stringify(vehicle, null, 2));
// }

// setup();