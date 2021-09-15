require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "development"
    ? process.env.PGDATABASE_TEST
    : process.env.PGDATABASE;

//const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

const connectionString =
  "postgres://lyjgbjog:0gBE6yDBQ0UIkjp4YmBJmqBr2pntBH3e@john.db.elephantsql.com/lyjgbjog";

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL // If deployed on Heroku, Heroku will supply us with a string called DATABASE_URL for the connectionString,
    : connectionString,
  /*
    SSL is not supported in development
    Alternatively, you can omit the ssl configuration object if you specify the PGSSLMODE config var: heroku config:set PGSSLMODE=no-verify
    See https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
    */
  ssl: isProduction //
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
