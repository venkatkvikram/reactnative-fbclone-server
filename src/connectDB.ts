import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'users',
    username: "venkat",
    password: "123456",
    logging: false,
})


export const testDBConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log(`Connected to DB`)
    }catch(err: any) {
        console.log('Unable to connect to the DB')
        throw err;
    }

}


sequelize.sync()
export default sequelize;