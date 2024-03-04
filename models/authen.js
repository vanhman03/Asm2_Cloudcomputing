var {Client} = require('pg');
var con_string = require('./pg_config');

async function authenticate(uname, pword){
    let auth = false;
    let shop = "";
    const client = new Client(con_string);
    await client.connect();
    const query_string = {
        text: 'SELECT * FROM users WHERE user_name=$1 AND pass_word=$2',
        values: [uname, pword],
    };
    const result = await client.query(query_string);
    // console.log(result); 
    if(result.rowCount == 1) { 
        auth = true;
        shop = result.rows[0]['shop']; 
    };
    client.end();
    return {"auth": auth, "shop": shop};
}

module.exports = authenticate;
