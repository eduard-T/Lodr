## Tests

> API must be running for all tests

1. Assign an order to a driver

- Description: A user should be able to take an unassigned order assign it to a driver by dragging and dropping it on that driver card

- Assumption: There is an order in the unassigned orders card

- Test Steps:

  1.  Navigate to the unassigned orders at the top of the page
  2.  Click and begin to drag the order from the unassigned orders
  3.  Drag it over to the desired driver card
  4.  Release the order for it to be added to the target

- Expected Result: The order should be removed from the current array on drag start and added to the target array on drop.

---

2. Reassign an order from one driver to another

- Description: A user should be able to take an order assigned to an existing driver and assign it to a different driver by dragging and dropping it on that driver card

- Assumption: There is an existing order inside an existing driver card

- Test Steps:

  1.  Navigate to the "Drivers" section
  2.  Click and begin to drag the order from the current driver card
  3.  Drag it over to the desired driver card
  4.  Release the order for it to be added to the target

- Expected Result: The order should be removed from the current driver card on drag start and added to the target driver card on drop.

---

3. Unassign an order from a driver

- Description: A user should be able to take an order assigned to an existing driver and assign it to a different driver by dragging and dropping it on the unassigned orders card / "Create an Order" card at the top

- Assumption: There is an existing order inside an existing driver card

- Test Steps:

  1.  Navigate to the "Drivers" section
  2.  Click and begin to drag the order from the current driver card
  3.  Drag it over to the unassigned orders card / "Create an Order" card
  4.  Release the order for it to be added to the target

- Expected Result: The order should be removed from the current driver card on drag start and added to the unassigned orders card on drop.

---

4. Edit an unassigned order

- Description: A user should be able to edit the content of an order that is not assigned to any driver and update it

- Precondition: The user must enter numbers within two decimal places for both the cost and revenue of the order

- Assumption: There is an existing order inside the unassigned orders

- Test Steps:

  1.  Navigate to the unassigned orders at the top of the page
  2.  Click the edit icon button to enter the editing state
  3.  Change the content within
  4.  Click the save icon button to exit the editing state and update the order

- Expected Result: The order should be updated in the database and the order ID should remain the same

---

5. Create a new order

- Description: A user should be able to create a new order and add it to the unassigned orders on click

- Precondition: The user must enter numbers within two decimal places for both the cost and revenue of the order

- Test Steps:

  1.  Navigate to the "Create an Order" card at the top
  2.  In the input fields, supply the new order with a description, cost, and revenue
  3.  Click the "Create Order" button to save the input and create the order

- Expected Result: The order should be added to the database and show up in the unassigned orders below

---

6. Add a new driver

- Description: A user should be able to create a new driver and add it to the drivers database

- Precondition: The user must enter a first and last name between 2 and 30 characters that do not contain illegal characters or numbers `ex. #&^@%$ or John47`

- Test Steps:

  1.  Navigate to the "Drivers" section
  2.  Click the "Add Driver" button
  3.  In the input fields, supply the new driver with a first and last name
  4.  Click the "Save" button to save the input and create the driver

- Expected Result: The driver should be added to the database and a driver card should show up in the drivers section below

---

7. Delete an order

- Description: A user should be able to delete an order from the database

- Assumption: There is an existing order inside a driver card

- Test Steps:

  1.  Navigate to the "Drivers" section
  2.  On any existing order in a driver card, click the "X" icon

- Expected Result: The order should be removed in the database and from the driver card
