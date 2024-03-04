var con_string = require('./pg_config');
var {Client} = require('pg');

async function crud(body){
    let id = parseInt(body.id);
    let name = body.name;
    let price = parseInt(body.price);
    let amount = parseInt(body.amount);
    let shop = body.shop;
    let btn = body.btn;
    // Connect to DB
    const client = new Client(con_string);
    await client.connect();

    if(btn == "Update"){
        // query to update DB
        const query_string = {
            text: `UPDATE products SET name = $1, price = $2, amount = $3, shop = $4 WHERE id = $5`,
            values: [name, price, amount, shop, id]
        }
        const result = await client.query(query_string);
        console.log("UPDATE");
        console.log(result);
    }
    else if(btn == "Delete"){
        // Query to delete row in DB
        const query_string = {
            text: `DELETE FROM products WHERE id = $1`,
            values: [id],
        }
        const result = await client.query(query_string);
        console.log("DELETE");
        console.log(result);
    }
    else{
        // Query to insert in DB
        console.log("This is insêrt")
        const query_string = {
            text: `INSERT INTO products (name, price, amount, shop) VALUES ($1, $2, $3, $4)`,
            values: [name, price, amount, shop],
        }
        let result = await client.query(query_string);
        console.log("INSERT");
        console.log(result);
    }
}
module.exports = crud;