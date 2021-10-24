# Driver Manager App

With this app, users acting as dispatchers can assign orders for drivers to fulfill for clients. Orders can be dragged and dropped to drivers or between them, and existing orders can be unassigned and then edited.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Contact](#contact)

## Technologies Used

Driver Manager was built using React JS and [Node v14.18.1] and uses the following technologies:

- Axios - v0.23.0
- Express - v4.17.1
- npm - v8.1.0

## Features

- New orders can be created with the description, cost, and revenue
- New drivers can be created with a first and last name
- Existing orders can be deleted
- Fully responsive and clean UI design

## Setup

Follow the steps below to get started with this project's development environment:

1. Install the latest version of npm

```
$ npm install -g npm
```

2. Install [Node 14.18.1](https://nodejs.org/en/download/)

3. Clone this repository and navigate into it

```
$ git clone https://github.com/Shmedi/Driver-Manager.git
$ git cd Driver-Manager
```

4. Install the project's dependencies

```
$ npm install
```

5. Start the API server

```
$ npm start
```

6. You should see the following after `npm start`

```
API running at PORT: 3001
```

7. Open a separate window in your terminal and navigate to the client

```
$ cd Driver-Manager/client
```

8. Install the dependencies

```
$ npm install
```

9. Start the application

```
$ npm start
```

You're ready to use the app! :alien:

## Known Issues

- Order is lost if it is dropped outside of unassigned orders or a driver card, this order is still present in the API, and returns to the card it was pulled from on refresh

## Contact

Created by [@Shmedi](https://eduardtupy.co/) - Visit my portfolio!
