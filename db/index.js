import { Sequelize } from "sequelize";

const db = new Sequelize("sqlite:todo.db");

export default db;
