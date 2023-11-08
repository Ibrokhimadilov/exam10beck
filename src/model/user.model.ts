import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize'

export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING({length: 32}),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING({length: 256})
    }
}, {
    timestamps: true,
})