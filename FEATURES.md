## Features

> This document contains the list of features included in the app

1. Clean and visually appealing UI; thought-through UX

- The app is fully responsive and has a very clean design that lets the user have a pleasant experience. Text is clear and there is padding around each element for greater legibility.

2. Ability to create new drivers and orders

- There are two input fields. One creates a new driver with a first and last name, as well as a generated uuid. The other field creates an order with a uuid and fields for the description, cost, and revenue. Either input creates an object and adds it to the respective database.

3. Ability to delete orders

- Each existing order in the driver loads has the ability to be deleted with the accompanying 'X' icon to the right of it

4. Proper input validation

- The order and driver inputs have a verification function that will only allow certain strings to be accepted before making an API call. In the order input, the description can be any string, but the cost and revenue must be a number with 2 decimal places `ex. 13.78 or 1432.54`. The driver inputs both must not contain numbers or illegal characters `ex. &^:#@` and must be between 2 and 30 characters long.
