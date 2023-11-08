import { UserModel } from './user.model'
import { CategoryModel } from './category.model'
import { ProductModel } from './product.model'
import { WishListModel } from './wishlist.model'

UserModel.hasMany(ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
})

CategoryModel.hasMany(ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'  
})

UserModel.hasMany(WishListModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
})

ProductModel.hasMany(WishListModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
})

ProductModel.belongsTo(CategoryModel)
ProductModel.belongsTo(UserModel)
WishListModel.belongsTo(UserModel)
WishListModel.belongsTo(ProductModel)

export {
    UserModel,
    CategoryModel,
    ProductModel,
    WishListModel
}