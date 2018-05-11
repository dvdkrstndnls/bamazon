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
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What is the item ID of the product you would like to buy??",
    })
    .then(function(answer) {
      // based on their answer, switch for search options
        switch(answer.action) {
            case "Find songs by artist":
                artistSearch();
                break;
            case "Find all artists who appear more than once":
                console.log("find artists appearing more than once working");
                break;
            case "Find data within a specific chart range":
                console.log("specific chart range working");
                break;
            case "Search for a specific song":
                console.log("specific song working");
                break;
        }
    });
}

// function to handle posting new items up for auction
function artistSearch() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Which artist/group?"
      },
      
    ])
    .then(function(answer) {
      // when finished prompting, display artist's songs
      connection.query(
        "SELECT * FROM top5000 WHERE ?",
        [
            {
                artist: answer.item 
            },
        ],
        function(err, results) {
          if (err) throw err;
          for (var i = 0; i < results.length; i++) {
          console.log(results[2]);
          
          }
          // re-prompt the user to do another query
          start();
        }
      );
    });
}

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }