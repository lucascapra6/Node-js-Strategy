const Sequelize = require('sequelize')
const heroesScheme = {
    name: 'heroes',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        skill: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName:'TB_HEROES',
        freezeTableName: false,
        timestamps: false
    }
}
module.exports = heroesScheme
