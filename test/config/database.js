exports.DBConfig = {
  test: {
    dbName:   "sequelize_tools_test",
    user:     "postgres",
    password: "password",
    options: {
      dialect: "postgres",
      port:    5432
    }
  }
};
