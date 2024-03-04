var con_string = require('./pg_config');
var {Client} = require('pg');

async function display_table(tb_name, user_name, role, shop_id) {
    // Connect to DB
    const client = new Client(con_string);
    await client.connect();
    var query_string = "";
    // Query  and get table data from DB
    if(role == "director"){
        if(shop_id == 0){
            query_string = `SELECT * FROM ${tb_name}`;
        } else {
            query_string = {
                text: `SELECT * FROM ${tb_name} WHERE shop = 
                (SELECT name FROM shops WHERE id = $1)`,
                values: [shop_id],
            };
        }
    }
    else if(role == "admin"){
        query_string = {
            text: `SELECT * FROM ${tb_name}`
        };
    }
    else{
        query_string = {
            text: `SELECT * FROM ${tb_name} WHERE shop = 
            (SELECT shop FROM users WHERE user_name = $1)`,
            values: [user_name],
        };
    }
    const result = await client.query(query_string);
    client.end();
    // Display table data as a HTML table (row <tr> and cells <td> ) in string
    // console.log(result);
    if(role == "director"){
        let table_string = table_product(result);
        return table_string;
    }else if(role == "admin"){
        let table_string = table_shops(result);
        return table_string;
    }else{
        let table_string = table_crud(result);
        return table_string;
    }
}

function table_crud(tb_data) {
    let table_string = `<table border=1> <tr>`;
    const fields_list = [];
    // Add header row into table_string
    tb_data.fields.forEach((field) => {
        table_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name);
    });
    // Add CRUD in header
    table_string += `<th> CRUD </th>`;
    table_string += '</tr>';
    // Add all data rows into table_string
    for (let i = 0; i < tb_data.rowCount; i++) {
        row = tb_data.rows[i];
        table_string += `<tr><form action="/shops/crud" method=POST>`;
        fields_list.forEach((field) => {
            let cell = row[field];
            table_string += `<td><input type="text" name='${field}' value='${cell}'></td>`;
        });
        table_string += `<td><input type="submit" name="btn" value="Update"> <input type="submit" name="btn" value="Delete"></td>`;
        table_string += '</form></tr>';
    }
    // Add an INSERT row at the end
    table_string += '<tr><form action="/shops/crud" method=POST>';
    tb_data.fields.forEach((field) => {
        table_string += `<td><input type="text" name='${field.name}'></td>`;
    });
    table_string += `<td><input type="submit" name="btn" value="Insert"></td>`;
    table_string += '</form></tr>';
    table_string += `</table>`;
    return table_string;
}

function table_product(tb_data){
    let table_string = `<table border=1> <tr>`;
    const fields_list = [];
    // Add header row into table_string
    tb_data.fields.forEach((field) => {
        table_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name);
    });
    table_string += '</tr>';
    // Add all data row into table_string
    for(let i = 0; i < tb_data.rowCount; i++) {
        row = tb_data.rows[i];
        table_string += `<tr>`;
        fields_list.forEach((field) => {
            let cell = row[field];
            table_string += `<td> ${cell} </td>`;
        })
        table_string += `</tr>`;
    }
    table_string += `</table>`;
    return table_string;
}
function table_shops(tb_data){
    let table_string = `<table border=1> <tr>`;
    const fields_list = [];
    // Add header row into table_string
    tb_data.fields.forEach((field) => {
        table_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name);
    });
    table_string += '</tr>';
    // Add all data row into table_string
    for(let i = 0; i < tb_data.rowCount; i++) {
        row = tb_data.rows[i];
        table_string += `<tr>`;
        fields_list.forEach((field) => {
            let cell = row[field];
            table_string += `<td> ${cell} </td>`;
        })
        table_string += `</tr>`;
    }
    table_string += `</table>`;
    return table_string;
}
module.exports = display_table;