var mysql = require("mysql");
var inquirer = require("inquirer");
console.log('working')


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

    // connect to the mysql server and sql database and display products
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + ": " + results[i].product_name + " $" + results[i].price)
        };
        start(results);
    });

  // run the start function after the connection is made to prompt the user
});

// function which prompts the user for what action they should take
function start(allProductsResults) {
  console.log()
    inquirer
    .prompt({
        name: "customerProductChoice",
        type: "input",
        message: "What is the item ID of the product you would like to buy?",

    })
    .then(function(productChoiceNumber) {
      // based on their answer, switch for search options

      console.log(productChoiceNumber); //delete once working

      //showing the product user chooses
      console.log(allProductsResults[productChoiceNumber.customerProductChoice - 1]);

      //calls howMany function from bottom of file
      howMany(allProductsResults[productChoiceNumber.customerProductChoice - 1]);

 
    });
}


function howMany (chosenProductInfo) {
inquirer
    .prompt(   {
        name: "customerUnits",
        type: "input",
        message: "How many units of the product would you like to buy?",
      }
    )
    .then(function(answer) {
      // based on their answer, switch for search options
      console.log(answer);
        if (chosenProductInfo.stock_quantity >= answer.customerUnits) {
            console.log('make purchase')
            var newQuanity = chosenProductInfo.stock_quantity - answer.customerUnits;
            updateDB(newQuanity, chosenProductInfo.item_id)
        }
        else {
            console.log("Oh No! We're sold out right now!");
            connection.end();
        }
    });

function updateDB(newQuanity, id) {
    console.log(newQuanity + " " + id); 
    connection.query(
        // first ? is the first item in the object and the second ? is the second
        "UPDATE products SET ? WHERE ?",
        [
            {
            stock_quantity: newQuanity
            },
            {
            item_id: id
            }
        ],
        function(error) {
            if (error) throw error;
            console.log("Purchase placed successfully!");
            connection.end();
        }
        );
    }
} 


