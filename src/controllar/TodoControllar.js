const TodoModel = require("../models/TodoModel");



//create todo start
exports.createTodo = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.email = req.headers.email;
        const todo = await TodoModel.create(reqBody);
        res.status(200).json({ status: "success", data: todo });
    } catch (error) {
        res.status(200).json({ status: "fail", data: error });
    }
};
//create todo end

//update todo start
exports.updateTodo = async (req, res) => {
    try {
        let id = req.params.id;
        let status  = req.params.status;
        let query  = {_id : id};
        const todo =  await TodoModel.updateOne(query ,{status : status});
        res.status(200).json({ status: "success", data: todo });
    }
    catch (error) {
        res.status(200).json({ status: "fail", data: error });
    }
}
   
    
//update todo end 

//delete todo start
exports.deleteTodo = async (req, res) => {
    try {
        let id = req.params.id;
        let query  = {_id : id};
        const todo =  await TodoModel.deleteOne(query);
        res.status(200).json({ status: "success", data: todo });
    }
    catch (error) {
        res.status(200).json({ status: "fail", data: error });
    }
}
//delete todo end

//todo list by status start

exports.TodoListByStatus = async (req, res) => {
   try {
       let status = req.params.status;
       let email = req.headers.email;

       const result =  await TodoModel.aggregate(
        [
            {$match:{email:email, status:status}},
            {$project:{_id:1, title:1, description:1, email:1, status:1, createDate:{$dateToString: {format: "%d-%m-%Y", date: "$createDate"}}}}
        ]
       )
       res.status(200).json({ status:"Successful" ,data:result})
   }
   catch(e){
    res.status(200).json( {"status":"Failed", data:e});
   }
}
//todo list by status end


//todo count by status start
exports.TodoCountByStatus = async (req, res) => {
   try {
       let email=req.headers.email;
       const result =  await TodoModel.aggregate(
           [
            {$match:{email:email}},
            {$group:{_id:"$status", total:{$count:{}}}}
           ]
       )
       res.status(200).json({ status:"Successful" ,data:result})
   }
   catch(error){
    res.status(200).json( {"status":"Failed", data:error});
   }

}

//todo count by status end

