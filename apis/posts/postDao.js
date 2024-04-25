const uuiGenerator  =  require("../../utils/uuidGenerator");

const allPostsDao = async (conn) => {
    const sql = 'SELECT * FROM posts order by created_at DESC';
    const data = await conn.query(sql);
    if(data){
        return data;
    }
    return undefined;
};

const postByIdDao = async (conn, id) => {
    const sql = `select * from posts where id = '${id}'`;
    const data = await conn.query(sql);
    console.log(data, 'dataa', sql)
    if(data){
        return data;
    }
    return undefined;
}

const createPostDao = async (conn, payload) => {
    const id = uuiGenerator();
    const config = JSON.stringify(payload.config);
    const sql = `INSERT INTO posts (id, title, config) VALUES (?, ?, ?)`;
    const params = [id, payload.title, config];
    const data = await conn.query(sql, params);
    if (data) {
        return data.affectedRows;
    }
    return undefined;
}


module.exports =  {allPostsDao, postByIdDao, createPostDao};
