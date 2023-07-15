import express from 'express';
import mysql, {Pool} from 'promise-mysql';

const app=express();
const router = express.Router();
let pool:Pool;

 async function initPool(){
     pool= await mysql.createPool({
        host:'localhost',
        port:3306,
        database:'task_app',
        user:'root',
        password:'mysql',
        connectionLimit:5
    });

}




app.use('/app/api/v1/tasks',router);
app.listen(8080,()=>console.log("Server is started"));

router.get('/',(req, res)=>{



});
router.post('/',(req, res)=>{

});

router.patch('/',(req, res)=>{

});

router.delete('/',(req, res)=>{

});









