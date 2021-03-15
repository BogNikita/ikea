import {getData} from './getData.js'
import generateSubcatalog from './generateSubcatalog.js';
export const catalog = () => {
    const updateSubCatalog = generateSubcatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const catalog = document.querySelector('.catalog');
    const btnClose = document.querySelector('.btn-close');
    const subCatalog = document.querySelector('.subcatalog');
    const subcatalogHeader = document.querySelector('.subcatalog-header');
    const btnReturn = document.querySelector('.btn-return')

    const overlay = document.createElement('div');
    overlay.classList.add('overlay')
    document.body.insertAdjacentElement('beforeend', overlay)

    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        catalog.classList.remove('open');
        overlay.classList.remove('active');
        closeSubMenu();
    }

    const handlerCatalog = event => {
        event.preventDefault();
        const target = event.target;
        const itemList = event.target.closest('.catalog-list__item');
        if (itemList){
            getData.subCatalog(target.textContent, (data) => {
               // subcatalogHeader.innerHTML = itemList.innerHTML;
                subCatalog.classList.add('subopen');
                updateSubCatalog(target.textContent, data);
            })
        };
        if(event.target.closest('.btn-close')){
            closeMenu();
        }
    }

    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen')
    }

    btnBurger.addEventListener('click', openMenu );
    btnClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    catalog.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', (evt) => {
        const btnReturn = evt.target.closest('.btn-return');
        if (btnBurger) closeSubMenu();
    })
    }