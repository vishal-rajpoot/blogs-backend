const { allPostsDao, createPostDao, postByIdDao } = require ("./postDao");
const db = require('../../utils/db');

const allPostsService = async () => {
    let conn;
    let allData=[];
    try {
        conn = await db.fetchConn();
        const data = await allPostsDao(conn);
        for(let insidedata of data){
           const newConfig = JSON.parse(insidedata.config);
           const newObj = {
            id: insidedata.id,
            title: insidedata.title,
            config: newConfig,
            created_at: insidedata.created_at
           }
           allData.push(newObj);
        }
        return allData;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (conn) conn.end();
    }
};

const postbyIdService = async (id) => {
    let conn;
    try {
        conn = await db.fetchConn();
        const data = await postByIdDao(conn, id);
        const newConfig = JSON.parse(data[0].config);
           const newObj = {
            id: data[0].id,
            title: data[0].title,
            config: newConfig,
            created_at: data[0].created_at
           }
        return newObj;
    } catch (error) {
        console.log(error);
    } finally {
        if(conn) conn.end();
    }
}

const createPostService =  async (payload) => {
    let conn;
    try {
        conn = await db.fetchConn();
        const data = await createPostDao(conn, payload);
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        if(conn) conn.end();
    }
}

module.exports =  {allPostsService, postbyIdService, createPostService};
