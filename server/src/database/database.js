const {Client}= require('pg');

const client = new Client(
    {
        host: "localhost",
        user: "bucheli",
        port: 5432,
        password: "0000",
        database: "mandeDev"
    }
)

client.connect();

client.query('Select * from employee',(err,res)=>{
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
}
)