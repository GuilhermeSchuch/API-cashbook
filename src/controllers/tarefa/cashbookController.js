const cashbookModel = require("../../models/tarefa/cashbookModel");
const mysql = require("../../models/mysqlConnect");

exports.get=async()=>{
    return await cashbookModel.get();   
}

exports.getAllByDate=async()=>{
    return await cashbookModel.getAllByDate();   
}

exports.getAllByMonth=async(year, month)=>{
    return await cashbookModel.getAllByMonth(year, month)
}

exports.getSumByMonth=async(year, month)=>{
    return await cashbookModel.getSumByMonth(year, month)
}

exports.getIntervalByMonth=async(year, monthS, monthF)=>{
    return await cashbookModel.getIntervalByMonth(year, monthS, monthF)
}



// exports.getById = async (headers, obraId)=>{
//     auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
//     if(auth.idUser){
//       if(headers.iduser==auth.idUser){
//         resp=await obraModel.getById(obraId);
//       }else{ 
//         resp= {"status":"null", auth}
//       }
//     }else{
//       resp= {"status":"null", auth}
//     }
//     console.log(resp);
//     return resp;
//   }