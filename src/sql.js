const
    mysql = require('mysql'),
    config = {
        host: '172.17.0.1',
        user: 'root',
        password: 'secret',
        database: 'itemlist'
    };
let connection;

try {
    connection = mysql.createConnection(config);
} catch (e) {
    config.host = '172.17.0.2';
    connection = mysql.createConnection(config)
}

connection.connect();

connection.query('CREATE TABLE IF NOT EXISTS `items` (`id` int PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(32), `description` VARCHAR(250), `code` varchar(25), `status` varchar(15) DEFAULT "active")', function (error, results, fields) {

    if (error) {
        throw error;
    }
});

const getOne = (id) => new Promise((resolve, reject) => {

    connection.query(`SELECT * FROM items WHERE id = ${id}`, function (error, results, fields) {

        if (error) {
            reject(error);
        }
        resolve(results);
    });
});

const getAll = () => new Promise((resolve, reject) => {

    connection.query(`SELECT * FROM items`, function (error, results, fields) {

        if (error) {
            reject(error);
        }
        resolve(results);
    });
});

const insert = (item) => new Promise((resolve, reject) => {

    connection.query(`INSERT INTO items (name, description, code, status) VALUES ("${item.name}", "${item.description}", "${item.code}", "${item.status}")`, function (error, results, fields) {

        if (error) {
            reject(error);
        }
        resolve(results);
    });
});

const update = (item) => new Promise((resolve, reject) => {

    connection.query(`UPDATE items SET name = '${item.name}', description = '${item.description}', code = '${item.code}', status = '${item.status}' WHERE id = ${item.id}`, function (error, results, fields) {

        if (error) {
            reject(error);
        }
        resolve(results);
    });
});

const remove = (itemID) => new Promise((resolve, reject) => {

    connection.query(`DELETE FROM items WHERE id = ${itemID}`, function (error, results, fields) {

        if (error) {
            reject(error);
        }
        resolve(results);
    });
});

module.exports = {
    getOne,
    getAll,
    insert,
    update,
    remove,
}