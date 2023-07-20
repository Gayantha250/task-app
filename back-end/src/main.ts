import express, {json} from 'express';
import mysql, {Pool} from 'promise-mysql';
import {router} from "./api/tasks";
import cors from 'cors';

const app=express();




app.use(cors())//use for make cross origin          //need to set before router// middle ware
app.use(json());           //use for read the json coming from the request     //need to set before router// middle ware
app.use('/app/api/v1/tasks',router);
app.listen(8080,()=>console.log("Server is started"));











