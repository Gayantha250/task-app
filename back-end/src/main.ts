import express from 'express';
import mysql, {ConnectionConfig} from 'promise-mysql';

const d=express();

let datasource;

 async function  getallTasks(){
   datasource=  await mysql.createConnection({
        host:"localhost",
        port:3306,
        database:"dep10_task",
        user:"root",
        password:"mysql"

    });

}

getallTasks();



