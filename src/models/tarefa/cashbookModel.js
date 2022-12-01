// const { getAllByMonth } = require("../../controllers/tarefa/cashbookController");
// const { getAllByMonth } = require("../../controllers/tarefa/cashbookController");
const mysql = require("../mysqlConnect");

get= async (query)=>{
    sqlInput='SELECT round(SUM(moviment.value), 2) as valorInput FROM moviment WHERE moviment.type = "input"';
    const resultInput = await  mysql.query(sqlInput);

    sqlOutput='SELECT round(SUM(moviment.value), 2) as valorOutput FROM moviment WHERE moviment.type = "output"';
    const resultOutput = await  mysql.query(sqlOutput);

    saldo = [{"saldo": parseFloat((resultInput[0].valorInput - resultOutput[0].valorOutput).toFixed(2))}];


    // result={ auth: true, token: token , user:users[0]}

    concatInputs = resultInput.concat(resultOutput);
    result = concatInputs.concat(saldo);

    console.log(result);
    return result;
}

getAllByDate = async (query)=>{
    sqlDate = `SELECT DISTINCT moviment.date FROM moviment WHERE moviment.type = "input" ORDER BY (moviment.date)`;
    const resultDate = await  mysql.query(sqlDate);
    console.log(resultDate);

    inputs = [];
    outputs = [];
    result = [];

    for(i = 0; i < resultDate.length; i++){
        resultDate[i].date = JSON.stringify(resultDate[i].date).substr(0, 11).replace('"', '');
        // console.log(resultDate[i].date);

        sqlInputDate = `SELECT round(SUM(moviment.value), 2) as input FROM moviment WHERE moviment.date = "${resultDate[i].date}" AND moviment.type = "input"`;
        const resultInputDate = await mysql.query(sqlInputDate);
        inputs.push(resultInputDate);

        sqlOutputDate = `SELECT round(SUM(moviment.value), 2) as output FROM moviment WHERE moviment.date = "${resultDate[i].date}" AND moviment.type = "output"`;
        const resultOutputDate = await mysql.query(sqlOutputDate);
        outputs.push(resultOutputDate);

        result.push(resultDate[i].date);
        result.push(inputs[i]);
        result.push(outputs[i]);

    }

    // console.log(inputs);
    // console.log(outputs);

    // console.log(JSON.stringify(resultDate));
    // console.log(resultDate[0]);

    // result = resultDate[0].concat(inputs[0]);
    console.log(result);

    return result;
}

getAllByMonth = async (year, month)=>{
    sql = `SELECT moviment.value, moviment.type FROM moviment WHERE moviment.date LIKE "%${year}-${month}%"`;

    const result = await mysql.query(sql);
    console.log(result);
    return result;
}

getSumByMonth = async (year, month)=>{
    sqlInput = `SELECT round(SUM(moviment.value), 2) as somaInput FROM moviment WHERE moviment.type = "input" AND moviment.date LIKE "%${year}-${month}%"`;
    const resultInput = await mysql.query(sqlInput);

    sqlOutput = `SELECT round(SUM(moviment.value), 2) as somaOutput FROM moviment WHERE moviment.type = "output" AND moviment.date LIKE "%${year}-${month}%"`;
    const resultOutput = await mysql.query(sqlOutput);

    result = [];
    result.push(resultInput);
    result.push(resultOutput);

    console.log(result);
    return result;
}

getIntervalByMonth = async (year, monthS, monthF)=>{
    sqlInput = `SELECT round(SUM(moviment.value), 2) as somaInput FROM moviment WHERE moviment.type = "input" AND moviment.date BETWEEN "${year}-${monthS}-01" AND "${year}-${monthF}-30"`;
    const resultInput = await  mysql.query(sqlInput);

    sqlOutput = `SELECT round(SUM(moviment.value), 2) as somaOutput FROM moviment WHERE moviment.type = "output" AND moviment.date BETWEEN "${year}-${monthS}-01" AND "${year}-${monthF}-30"`;
    const resultOutput = await  mysql.query(sqlOutput);

    result = [];
    result.push(resultInput);
    result.push(resultOutput);
    console.log(result);
    
    return result;
}

module.exports= {get, getAllByDate, getAllByMonth, getSumByMonth, getIntervalByMonth};