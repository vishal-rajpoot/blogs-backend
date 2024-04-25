const  express = require('express');
const cors = require('cors');
const app = express();
const apis  =  require('../api/apis/index');
const { inititializeConnection } = require('./utils/db');
const bodyParser = require('body-parser');


const port = 8088;
  
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(apis);

const onListening = ()=> {
    console.log(`Server started Listening on port: ${port}`)
}

app.get('/test', (req,res) => {
    res.json("testing is ok")
})

inititializeConnection();
app.listen(port, onListening);