# Leggo My Lego - Product Overview Module

> A fullstack application built with React, ExpressJS, and MySQL. This app serves as the product overview module for an ecommerce website where a user can add varying quantities to cart, add to wishlist, and check in-store availability.

## Table of Contents

1. [Requirements](#requirements)
1. [Getting Started](#gettingStarted)
1. [Run Application](#runApplication)
1. [Development](#development)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

You will need MySQL

- MySQL 5.7.29

## Getting Started

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Configure MySQL Credentials

From within ./db/index.js, configure credentials :

```sh
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'product_component',
});
```

### Seed Database With Mock Data

```sh
npm run seed-db
```

## Run Application

### Start app in production mode

```sh
npm start
```

## Development

### Start app in development mode

```sh
npm run dev
```

## Related Projects
  > Team Members' Modules
  - https://github.com/LeggoMyLego/ReviewComponent
  - https://github.com/LeggoMyLego/GalleryComponent
  > Proxy Server for Serving All Modules
  - https://github.com/LeggoMyLego/JoeyProxyServer
