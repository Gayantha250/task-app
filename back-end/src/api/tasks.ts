import express ,{json} from "express";
import mysql, {Pool} from "promise-mysql";

let pool:Pool;
export const router = express.Router();

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

    if(!task.status){
        res.sendStatus(400);
        return;
    }

    const updateValues = await pool.query("UPDATE tasks SET description=?, status=? WHERE id=?",[task.description,task.status,taskId]);
    res.sendStatus(updateValues.affectedRows?204:404);
});

router.delete('/:taskId',async (req, res)=>{


    const taskId = +req.params.taskId;



    const deleteTasks =await pool.query("DELETE FROM tasks WHERE id=?",[taskId]);

    res.sendStatus(deleteTasks.affectedRows?204:400);

});