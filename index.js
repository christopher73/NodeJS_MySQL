const uniqid = require("uniqid");
const mysql = require("mysql");
const inquirer = require("inquirer");

function displayDB() {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "Christopher",
    password: "",
    database: "bamazon"
  });
  connection.connect();
  connection.query(`SELECT * from products`, (error, results, fields) => {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      console.log(
        `\n${"=".repeat(28)}\t |PRODUCT ${i + 1}|\t${"=".repeat(28)}`
      );
      console.log("Product ID: \t", results[i].ID);
      console.log("Prodcut Name: \t", results[i].product_name);
      console.log("Dpt. Name: \t", results[i].deparment_name);
      console.log("Prosucr Price: \t", results[i].price);
      console.log("Stock Qty: \t", results[i].stock_quantity);
    }
    console.log(`\n${"=".repeat(28)}\n${"=".repeat(28)}\nSELECT PRODUCT'S ID:`);
  });
  connection.end();
}
function display_byID(id) {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "Christopher",
    password: "",
    database: "bamazon"
  });
  connection.connect();
  connection.query(
    `select * from products where ID = "${id}"`,
    (error, results, fields) => {
      if (error) throw error;
      console.log(
        `\n ID: ${results[0].ID} \n NAME: ${results[0].product_name} \n DPT.: ${
          results[0].deparment_name
        } \n PRICE: ${results[0].price} \n STOCK: ${results[0].stock_quantity}\n
      `
      );
      return results[0];
    }
  );
  connection.end();
}
function buy_byID(id, qty) {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "Christopher",
    password: "",
    database: "bamazon"
  });
  connection.connect();

  connection.query(
    `select stock_quantity from products where ID="${id}"`,
    (error, results, fields) => {
      //console.log(results[0].stock_quantity);
      if (results[0].stock_quantity < qty) {
        console.log("not enough Qty. in stock");
        //connection.end();
        return false;
      } else {
        var connection2 = mysql.createConnection({
          host: "127.0.0.1",
          user: "Christopher",
          password: "",
          database: "bamazon"
        });
        connection2.connect();
        let sql = `UPDATE products
  SET stock_quantity = stock_quantity - ${qty}
  WHERE ID = ? and stock_quantity > 0`;

        let data = [id];
        connection2.query(sql, data, (error, results, fields) => {
          if (error) throw error;
          //display_byID(id);
          getPrice(id, qty);
        });
        connection2.end();
      }
    }
  );

  connection.end();
}
function getPrice(id, qty) {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "Christopher",
    password: "",
    database: "bamazon"
  });
  connection.connect();
  connection.query(
    `select price from products where ID="${id}"`,
    (error, results, fields) => {
      let price = parseInt(results[0].price) * parseInt(qty);
      console.log(`YOUR TOTAL IS $${price}\n THANKS FOR YOUR MONEY!!!`);
    }
  );
  connection.end();
}
function greet() {
  const grt = "\n\nWelcome to BAMAZON\n\nCheck Our Products:\n";
  displayDB();
}

var questions = [
  {
    type: "input",
    name: "id",
    message: () => {
      greet();
    }
  },
  {
    type: "input",
    name: "quantity",
    message: "How many do you need?",
    filter: Number
  }
];
inquirer.prompt(questions).then(answers => {
  buy_byID(answers.id, answers.quantity);
  console.log(
    `\n*******RECEIPT*********\nITEM'S ID: ${answers.id}\nQUANTITY: ${
      answers.quantity
    }\n`
  );
});
