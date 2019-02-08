// Node.js + Express server backend
// use SQLite (https://www.sqlite.org/index.html) as a database
//

// run this once to create the initial database file
//   node create_database.js

// to clear the database, simply delete the database file:

const sqlite3 = require('sqlite3');
const dbName = 'model.db';
const db = new sqlite3.Database(dbName);

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database tables:
  db.run("CREATE TABLE components (id INTEGER PRIMARY KEY, class TEXT, name TEXT, properties TEXT, graphics TEXT)");
  db.run("CREATE TABLE wbsitems (id INTEGER PRIMARY KEY, class TEXT, name TEXT)");

  let valve = {
    class: "valve",
    name: "V-100",
    props: [ { desc: 'Gate Valve' }, { length: 50 }, { weight: 100 } ],
    graphics: [ 
      {type: 0, start: {x: 25, y:10}, end: {x: 75, y:10}},
      {type: 1, radius: 2, center: {x: 50, y:10}}
    ]
  };

  let pump = {
    class: "pump",
    name: "P-100",
    props: [{desc:"Centrifugal Pump"}, {manufacturer: "ABC"}],
    graphics: [ 
      {type: 0, start: {x: 25, y:60}, end: {x: 75, y:60}},
      {type: 1, radius: 2, center: {x: 50, y:60}}
    ]
  };

  let tank = {
    class: "tank",
    name: "T-100",
    props: [{desc:"Horizontal Tank"},{manufacturer: "XYZ"}],
    graphics: [ 
      {type: 0, start: {x: 25, y:100}, end: {x: 75, y:100}},
      {type: 1, radius: 2, center: {x: 50, y:100}}
    ]
  };


  // insert data into components table:
  db.run(`INSERT INTO components (class, name, properties, graphics)  VALUES 
                      ('${valve.class}', '${alve.name}', '${JSON.stringify(valve.props)}', '${JSON.stringify(valve.graphics)}'),
                      ('${pump.class}', '${pump.name}', '${JSON.stringify(pump.props)}', '${JSON.stringify(pump.graphics)}'),
                      ('${tank.class}', '${tank.name}', '${JSON.stringify(tank.props)}', '${JSON.stringify(tank.graphics)}')
         `);
         
  console.log(`successfully created the components table in ${dbName}`);

  // insert data into wbsitems table:
  db.run(`INSERT INTO wbsitems (class, name)  VALUES 
                      ('unit', 'U1'),
                      ('unit', 'U2'),
                      ('service', 'S1'),
                      ('area', 'A1')
         `);
         
  console.log(`successfully created the wbsitems table in ${dbName}`);

  // print them out to confirm their contents:
  db.each("SELECT * FROM components", (err, row) => {
    let comp = {
      class: row.class,
      name: row.name,
      properties: row.properties ? JSON.parse(row.properties) : [],
      graphics: row.graphics ? JSON.parse(row.graphics) : []
    };
      console.log(`class=${comp.class}, name=${comp.name}, 
                  properties=${JSON.stringify(comp.properties)}, 
                  graphics=${JSON.stringify(comp.graphics)}`);

  });

  // db.each("SELECT * FROM wbsItems", (err, row) => {
  //   console.log(row);
  // });
});

db.close();