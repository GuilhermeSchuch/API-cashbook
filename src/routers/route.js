const express = require('express');
const userController=require("../controllers/userController");
const movimentoController=require("../controllers/movimentController");
const cashbookController = require("../controllers/tarefa/cashbookController");
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).send("<h1>CASHBOOK API</h1>");
})

router.get('/user', async (req, res, next)=> {
    user= await userController.get();
    res.status(200).send(user);
});

router.post('/user/login', async (req, res, next)=> {
    user= await userController.login(req.body);
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next)=> {
    user= await userController.login(req.headers['x-access-token']);
    res.status(200).send(user);
});

router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get();
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})
/*
router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get(Buffer.from(req.query.query, 'base64').toString('utf-8'));
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})*/

router.post('/mov',async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
            resp= await  movimentoController.post(req.body, req.headers.iduser);
            resp = Object.assign({}, resp, auth);
        }else{
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)   
})

router.put('/mov', async (req, res, next)=>{
    movimento=movimentoController.put(req.body, req.headers.idUser);
})

router.delete('/movimento', async (req, res, next)=>{
    movimento=movimentoController.delete(req.headers.idUser);
})


// --------------TAREFA--------------
router.get('/cashbook/cashbalance', async (req, res, next)=> {
    resp= await cashbookController.get();
    res.status(200).send(resp);
});

router.get('/cashbook/io', async (req, res, next)=> {
    resp= await cashbookController.getAllByDate();
    res.status(200).send(resp);
});

router.get('/cashbook/:year/:month', async (req, res, next)=> {
    resp= await cashbookController.getAllByMonth(req.params.year, req.params.month);
    res.status(200).send(resp);
    console.log("Rota: " + req.params.year + ' ' + req.params.month);
});

router.get('/cashbook/io/:year/:month', async (req, res, next)=> {
    resp= await cashbookController.getSumByMonth(req.params.year, req.params.month);
    res.status(200).send(resp);
});

router.get('/cashbook/io/:year/:monthS/:monthF', async (req, res, next)=> {
    resp= await cashbookController.getIntervalByMonth(req.params.year, req.params.monthS, req.params.monthF);
    res.status(200).send(resp);
});




// bibliotecaRouter.get('/obra/:obraId', async(req, res, next)=>{
//     resp=await obraController.getById(req.headers, req.params.obraId);
//     res.status(200).send(resp);
//   });

module.exports = router;