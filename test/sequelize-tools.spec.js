"use strict";

process.env.NODE_ENV            = "test";
process.env.SEQUELIZE_DB_CONFIG = "test/config/database.js";

var expect = require("expect.js"),
    Path   = require("path"),
    stools = require(require.resolve(Path.resolve("index"))),
    db     = stools.db;

describe("db", function() {

  describe("chooseEnvConfig()", function() {
    it("reads from the config file specified in SEQUELIZE_DB_CONFIG", function() {
      var dbConfig = db.chooseEnvConfig();
      expect(dbConfig.dbName).to.be("sequelize_tools_test");
    });
  });

});
