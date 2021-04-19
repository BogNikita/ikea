import { getLocalStorage, setLocalStorage } from './storage.js';

const userData = {
    _wishlistData: getLocalStorage('wishlist'),

    get wishList () {
        return this._wishlistData;
    },
    set wishList(id) {
        if (this._wishlistData.includes(id)){
            const index = this._wishlistData.indexOf(id);
            this._wishlistData.splice(index, 1)
        } else this._wishlistData.push(id)
         setLocalStorage('wishlist', this._wishlistData)
    },
    _cartListData: getLocalStorage('cartlist'),
    get cartList () { 
        return this._cartListData;
    },

    set cartList (id) {
         let obj = this._cartListData.find(item => item.id === id);
         if (obj){
             obj.count++
         } else {
             obj = {
                 id,
                 count: 1,
             };
             this._cartListData.push(obj)
         } setLocalStorage('cartlist', this._cartListData)
    },
    set changeCountCartList(itemCart) {
        let obj = this._cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;
    },
    
    set deleteItemCart(idd) {
        const find = this.cartList.findIndex(item => item.id === idd)
        this.cartList.splice(find, 1);
        setLocalStorage('cartlist', this._cartListData);
    }
}

export default userData;