const mariadb =  require('mariadb');

let connPool;
const inititializeConnection = () => {
    connPool = mariadb.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345',
        database: 'blogs'
    });
};

const fetchConn = async () => {
    const conn = await connPool.getConnection();
    return conn;
}

module.exports =  { inititializeConnection, fetchConn};