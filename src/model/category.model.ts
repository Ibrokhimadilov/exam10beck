import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize'

export const CategoryModel = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING({length: 32}),
        allowNull: false
    }
})