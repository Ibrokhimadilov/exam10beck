import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize'

export const WishListModel = sequelize.define('wishlist', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }
})