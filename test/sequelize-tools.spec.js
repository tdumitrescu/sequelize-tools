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

  describe("defaultConnection()", function () {
    it("initializes a DbConnection", function() {
      var dc = db.defaultConnection();
      expect(dc.testEnv).to.be(true);
    });

    it("retains the created object on subsequent calls", function() {
      var dc1 = db.defaultConnection(),
          dc2 = db.defaultConnection();
      expect(dc1).to.be(dc2);
    });
  });

  describe("init()", function() {
    it("calls the given callback after successfully syncing", function(done) {
      db.init(done);
    });
  });

});
