[![Build Status](https://travis-ci.org/emmeryn/sequelize-tools.png?branch=master)](https://travis-ci.org/emmeryn/sequelize-tools)

# sequelize-tools (forked by emmeryn)

Tools to facilitate choosing and initializing database connections with the Node.js SQL ORM [Sequelize](http://sequelizejs.com/). `sequelize-tools` reads database connection configurations from a Node module which you provide, and offers a simple API for initializing and using global Sequelize connections based on the environment defined in the NODE_ENV environment variable.

## Installation

Add `sequelize-tools` to dependencies in `package.json`:

    npm install --save sequelize-tools

## Usage

### Database connection configuration

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

NB: Never check passwords and other sensitive information into source control. If you leave your database credentials in plain text as in the first example above, then it is recommended that you check in only an "example" file with dummy info (e.g., `config/database.js.example`) and add the real config file to `.gitignore`. For an interesting example of pulling database credentials dynamically from the local system, see "[database.yml should be checked in](http://effectif.com/articles/database-yml-should-be-checked-in)."

An alternate location for the config file can be specified in the environment variable `SEQUELIZE_DB_CONFIG`, which will override the default location, e.g.:

    SEQUELIZE_DB_CONFIG=my_config_dir/database.coffee node my_app

### Database interaction

The `sequelize-tools` module exports a class `db` with which all database connections are accessed. The `db.init()` function will automatically determine the appropriate connection based on the environment (`NODE_ENV`), connect to the DB with the credentials in the config file, and sync the schema for any registered models:

```javascript
db = require("sequelize-tools").db

db.init(function() {
  // successfully connected, authenticated, synced
});
```

NB: in the `test` environment, `db.init()` will sync the schema with the option `force: true`, which will wipe any existing data in the test database. Calling `db.init()` before each test will ensure a clean database.

The `db.sequelize()` function returns the Sequelize object for the default connection, which can be used to register models and call any other standard Sequelize functions:

```javascript
db = require("sequelize-tools").db

MyModel = db.sequelize().define("my_model", {title: Sequelize.STRING});
```

Since `sequelize-tools` lazy-loads and then retains a reference to the base connection, separate modules within your app need not worry about passing around an initialized `sequelize` object in order to communicate with the correct database.

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
