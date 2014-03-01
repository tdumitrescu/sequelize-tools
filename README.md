[![Build Status](https://travis-ci.org/tdumitrescu/sequelize-tools.png?branch=master)](https://travis-ci.org/tdumitrescu/sequelize-tools)

# sequelize-tools

Tools to facilitate choosing and initializing database connections with the Node.js SQL ORM [Sequelize](http://sequelizejs.com/). `sequelize-tools` reads database connection configurations from a Node module which you provide, and offers a simple API for initializing and using global Sequelize connections based on the environment defined in the NODE_ENV environment variable.

## Installation

Add `sequelize-tools` to dependencies in `package.json`:

    npm install --save sequelize-tools

## Usage

Create a connection configuration file (located by default at `server/config/database.[js|coffee]` from your project root). This is a Node module which exports an object `DBConfig`, specifying database names and credentials for different environments:

```javascript
exports.DBConfig = {

  development: {
    dbName:   "my_app_development",
    user:     "postgres",
    password: "password",
    options: {
      dialect: "postgres",
      port:    5432
    }
  },

  test: {
    dbName:   "my_app_test",
    user:     "postgres",
    password: "password",
    options: {
      dialect: "postgres",
      port:    5432
    }
  }

};
```

Since the config file is a regular Node module, the exported object can be constructed dynamically if needed:

```javascript
var defaultOptions = {
      dialect: "postgres",
      port:    5432
    },
    credentials = fetchCredentialsFromSystem();

exports.DBConfig = {

  development: {
    dbName:   "my_app_development",
    user:     credentials.development.user,
    password: credentials.development.password,
    options:  defaultOptions
  },

  test: {
    dbName:   "my_app_test",
    user:     credentials.test.user,
    password: credentials.test.password,
    options:  defaultOptions
  }

};
```

An alternate location for the config file can be specified in the environment variable `SEQUELIZE_DB_CONFIG`, which will override the default location, e.g.:

    SEQUELIZE_DB_CONFIG=my_config_dir/database.coffee node my_app

## Local development and running tests

Clone repo:

    git clone git@github.com:tdumitrescu/sequelize-tools.git

Install dependencies:

    npm install

Create PostgreSQL test database (accessed with user "postgres"/"password"):

    psql -c 'create database sequelize_tools_test;' -U postgres

Run Mocha test script:

    npm test

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
