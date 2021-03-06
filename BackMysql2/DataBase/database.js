var mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Monze@201x9',
    database: 'presly',
    connectionLimit: 10,
    debug: false
});

function executeQuery(sql, callback) {
    pool.getConnection((err, connection) => {
        if (err) { return callback(err, null); }
        else {
            if (connection) {
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) { return callback(error, null); }
                    return callback(null, results);
                });
            }
        }
    });
}
function query(sql, callback) {
    executeQuery(sql, function (err, data) {
        if (err) {  return callback(err);  }
        callback(null, data);
    });
}
module.exports = { query: query }