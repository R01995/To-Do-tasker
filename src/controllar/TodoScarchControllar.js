const TodoModel = require("../models/TodoModel");

exports.ProductSearchAndPaiganation = async (req, res) =>{
 
  try{
    let pageNumber = Number(req.params.pageNumber) 
    let perPage = Number(req.params.perPage)
    let searchKeyword = req.params.searchKeyword

    let skip = perPage * (pageNumber - 1)
    
    let data ;

    if(searchKeyword != "null"){
       let searchRegex = {$regex : searchKeyword, $options: "i"}
       let query = {$or : [{titel : searchRegex}, {category : searchRegex}, {description : searchRegex}]}

       data = await TodoModel.aggregate([
         {
            $facet: {
                total : [{$match : query},{$count : "total"}],
                rows : [{$match : query}, {$skip : skip}, {$limit : perPage}],    
            }
         }
       ]) 
    }
    else{
         
        
       data = await TodoModel.aggregate([
        {
           $facet: {
               total : [{$count : "total"}],
               rows : [{$skip : skip}, {$limit : perPage}],    
           }
        }
      ])
    }

    res.status(200).json({status: "success", data: data})

  }
  catch(error){
    res.status(200).json({status: "fail", data: error})
  }

}