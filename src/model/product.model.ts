import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize'

export const ProductModel = sequelize.define('products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING({length: 32}),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING({length: 32}),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING({length: 512}),
        allowNull: false
    }
})