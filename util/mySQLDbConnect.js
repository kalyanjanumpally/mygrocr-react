

/*

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  password: "springstudent",
  database: "swap4pure-db"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log("Connection Success.");
    console.log(result);
    //console.log(fields);
    con.end(function(err) {
        // The connection is terminated now
      });

  });
});

 

// con.destroy();