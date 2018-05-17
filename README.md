# bamazon
An Amazon-like storefront that uses node.js and MySQL

## Overview

I've created an Amazon-like storefront with the MySQL. The app takes in orders from customers and depletes stock from the store's inventory. 

## Installation
I've asked my .gitignore file to ignore my Node modules, so you'll need to install NODE, MYSQL and INQUIRER

![GitHub Logo](/images/proofofconceptterminal.png)



This is a CLI App, so you don't need to deploy it to Heroku to work. 


## Instructions

### Customer View 

1. I've create a MySQL Database called `bamazon`.

2. Then created a Table inside of that database called `products`.

3. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. I've populated this database with 10 different products. (i.e. "mock" data rows into this database and table).

5. I then created a Node application called `bamazonCustomer.js`. Running this application displays all of the items available for sale. Including the ids, names, and prices of products for sale.

6. The app prompts users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the customer has placed the order, your application checks if the store has enough of the product to meet the customer's request.

   * If not, the app should logs a phrase like `Insufficient quantity!`, and and prevents the order from going through.

8. However, when the store _does_ have enough of the product, we fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, terninal shows the customer the total cost of their purchase.

- - -



