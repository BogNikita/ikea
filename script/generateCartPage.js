import { getData } from './getData.js';
import userData from './userData.js';

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
    }
    return await response.json()
}

const sendCart = () => {

    const cartForm = document.querySelector('.cart-form')

    cartForm.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(cartForm);
        const cartList = JSON.stringify(userData.cartList);
        formData.set('order', cartList)

        
        sendData('http://jsonplaceholder.typicode.com/posts', formData)
        .then(() => {
            cartForm.reset();
        })
        .catch((err) => { 
            console.error(err)
        })
    })
};
const generateCartPage = () => {
    if(location.pathname.includes('cart')){
        
    
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.cart-total-price')
    const generateCart = (data) => {
    cartList.textContent = '';  
    let totalPrice = 0;
        data.forEach(item => {
           let options ='';
           let countUser = userData.cartList.find(elem => item.id === elem.id).count;
           if (countUser > item.count){
               countUser = item.count;
           }
           for ( let i = 1; i <= item.count; i++){
               options+=`<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`
           }
           totalPrice +=countUser*item.price; 
           cartList.insertAdjacentHTML('beforeend', `
           <li class="cart-item">
           <div class="product">
               <div class="product__image-container">
                   <img src="${item.img}" alt="${item.name} - ${item.description}" aria-describedby="aria_product_description_40366083" itemprop="image">
               </div>
               <div class="product__description">
                   <h3 class="product__name">
                       <a href="card.html#${item.id}">${item.name}</a></h3>
                   <p class="product_description-text">${item.description}</p>
               </div>
               <div class="product__prices">
                   <div class="product__price-type product__price-type-regular">
                    <div class="product__price-regular product__total ">${item.price*countUser}.-</div>
                        ${ countUser > 1 ?
                             `<div class="product__total-regular">${item.price}.-</div>` :  ` `
                        }
                       </div>
                   </div>
               </div>
               <div class="product__controls">

                   <div class="product-controls__remove">
                       <button type="button" class="btn btn-remove" data-idd="${item.id}">
                           <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                       </button>
                   </div>
                   <div class="product-controls__quantity">
                       <select title="Выберите количество" aria-label="Выберите количество" data-idd="${item.id}">
                       ${options}
                       </select>
                   </div>
               </div>
           </div>
       </li>
           `)
        });
       cartTotalPrice.textContent = totalPrice;
    }
    getData.cart(userData.cartList, generateCart);
    cartList.addEventListener('change', evt => {
        userData.changeCountCartList = {
            id: evt.target.dataset.idd,
            count: parseInt(evt.target.value)
        }
        getData.cart(userData.cartList, generateCart);
    });
    
    cartList.addEventListener('click', (evt) => {
        const target = evt.target;
        const btnRemove = target.closest('.btn-remove');
        if (btnRemove){
            userData.deleteItemCart = btnRemove.dataset.idd;
            getData.cart(userData.cartList, generateCart);
        }
        
    })
    sendCart();
}
}
export default generateCartPage;