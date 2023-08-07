import * as dotenv from "dotenv"
dotenv.config({path: __dirname+"/.env"})

import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import employeeRoute from "./route/employee.route";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import roleRoute from "./route/role.route";
// import jsonformatter from "./middleware/jsonformatter.middleware";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/api/employees", employeeRoute);
server.use("/api/departments",departmentRoute);
server.use("/api/roles",roleRoute);
// server.use(jsonformatter);
server.use(errorMiddleware);

server.get("/*", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello World Typescript");
});

(async () => {
  await dataSource.initialize();
  server.listen(process.env.PORT, () => {
    console.log("Server is listening to 3000");
  });
})();
