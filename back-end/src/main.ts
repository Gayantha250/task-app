import express, {json} from 'express';
import mysql, {Pool} from 'promise-mysql';

const app=express();
const router = express.Router();
let pool:Pool;

initPool();
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



app.use(json());           //use for read the json coming from the request
app.use('/app/api/v1/tasks',router);
app.listen(8080,()=>console.log("Server is started"));

type Task={

    id:number,
    description:string,
    status:'COMPLETED'|'PENDING'|undefined
}

router.get('/',async (req, res)=>{
const getAllTasks = await pool.query("SELECT * FROM tasks");
res.json(getAllTasks);
});
router.post('/',async (req, res)=>{
    const body = req.body as Task;
    if(!body.description?.trim()){
        res.sendStatus(400);
        return;
    }

const insertValues = await pool.query("INSERT INTO tasks (description, status) VALUES (?,DEFAULT) ",[body.description]);

body.id = insertValues.insertId;
body.status='PENDING';
res.status(201).json(body);  //its not necessary to send json but when its send we can get some advantages like we can show them in toast
});

router.patch('/:taskId',async (req, res)=>{

    const task = req.body as Task;
     const taskId =+req.params.taskId;

     const updateValues = await pool.query("UPDATE tasks SET description=?, status=? WHERE id=?",[task.description,task.status,taskId]);
     res.sendStatus(updateValues.affectedRows?204:404);
});

router.delete('/:taskId',async (req, res)=>{


    const taskId = req.params.taskId;

    const deleteTasks =await pool.query("DELETE FROM tasks WHERE id=?",[taskId]);

    res.sendStatus(deleteTasks.affectedRows?204:400);

});









