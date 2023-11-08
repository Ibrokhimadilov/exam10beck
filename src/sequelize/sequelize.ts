import { Sequelize } from "sequelize"


export const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: "+998946129238",
    database: "exam10",
    logging: true,
    retry: {
        max: 5,
        timeout: 5000
    },
    dialect: "postgres"
})