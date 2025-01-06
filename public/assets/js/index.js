const header = document.querySelector('header');
const carousel = document.querySelector('.recipes');
let items = document.querySelectorAll('.item');
const popup = document.querySelector('.popup');
const checkout = document.querySelector('.checkout');
const totalSpan = document.querySelector('.total-value');
const itemsContainer = document.querySelector('.items-container');
const cartContainer = document.querySelector('.cart-container');
const counterSpan = document.querySelector('.counter');

// ----------- Hero Banner Button -----------

document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.recipes-section').scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    })
})

// ----------- Header Animation -----------

document.addEventListener('scroll', () => {
    if(window.scrollY === 0){
        header.classList.contains('animations') && header.classList.remove('animations');
        header.style.backgroundColor = 'transparent';
    }else{
        header.classList.add('animations');
    };
});

// ----------- Carousel Animation -----------

document.querySelectorAll('.arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {

        items.forEach((item) => {
            item.classList.remove('emphasis');

        });

        arrow.classList.contains('left-span') ? carousel.prepend(carousel.lastElementChild): carousel.appendChild(carousel.firstElementChild);
        items = carousel.querySelectorAll('.item');
        items[2].classList.add('emphasis');
    });
});

// ----------- Shopping Cart Animation -----------

class Cart{
    constructor(){
        this.cartItem = 
        `<p class="recipe-name"></p>
        <span class="spacement"> - </span>
        <p class="recipe-price"></p>
        <div class="quantity-container">
            <img class="quantity-icon remove-icon" src="./public/assets/images/popup/remove_icon.png" alt="Remover">
            <span class="item-count"></span>
            <img class="quantity-icon add-icon" src="./public/assets/images/popup/add_icon.png" alt="Adicionar">
        </div>`;
        
        this.cartIndex = 0;
        this.totalValue = 0;
        this.recipesInCart = [];
    };

    incrementCounter(){
        this.cartIndex += 1;
        if(!cartContainer.contains(counterSpan)){
            const counterSpan = document.createElement('span');
            counterSpan.classList.add('counter');
            counterSpan.innerHTML = this.cartIndex;
            cartContainer.prepend(counterSpan);
        } else{
            counterSpan.innerHTML = this.cartIndex;
        };
    };

    addIconEvents(item){
        const quantityIcons = item.querySelectorAll('.quantity-icon');
        const itemCount = item.querySelector('.item-count');
    
        quantityIcons.forEach(icon => {
            icon.addEventListener('click', () => {

                const recipeName = item.querySelector('.recipe-name');

                newItem.recipesInCart.forEach(obj => {
                    if(obj.name === recipeName.innerHTML){
                        if(icon.classList.contains('remove-icon')){
                            obj.index -= 1;
                            itemCount.innerHTML = parseInt(itemCount.innerHTML) - 1;
                        }else{
                            obj.index += 1;
                            itemCount.innerHTML = parseInt(itemCount.innerHTML) + 1;
                        };
                        if (obj.index <= 0){
                            item.remove();
                            const index = newItem.recipesInCart.indexOf(obj);
                            newItem.recipesInCart.splice(index, 1);
                            this.isEmpty();
                        };
                    };
                });
                this.getTotalValue();
                sessionStorage.setItem('recipesInCart', JSON.stringify(newItem.recipesInCart));
            });
        });
    };

    getTotalValue(){
        this.totalValue = 0;
        for(const i of newItem.recipesInCart){
            this.totalValue += i.index * parseFloat(i.value.slice(3,));
        }
        totalSpan.innerHTML = `${this.totalValue.toFixed(2)}`;
    };

    showRecipesInCart(){
        itemsContainer.innerHTML = '';
        popup.style.display = "flex";

        if(newItem.recipesInCart.length > 0){
            newItem.recipesInCart.forEach(obj => {
                const {name, value, index} = obj;
                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = this.cartItem;
                item.querySelector('.recipe-name').innerHTML = name;
                item.querySelector('.recipe-price').innerHTML = value;
                item.querySelector('.item-count').innerHTML = index;
                itemsContainer.appendChild(item);

                this.addIconEvents(item);
    
                checkout.disabled = false;
                checkout.classList.remove('disabled');
                this.getTotalValue();
            });
        }else{
            this.isEmpty();
        };
    };

    isEmpty(){
        if(newItem.recipesInCart.length <= 0){
            const p = document.createElement('p');
            p.innerHTML = 'Ops... Seu carrinho está vazio!';
            itemsContainer.innerHTML = '';
            itemsContainer.appendChild(p);
            checkout.disabled = true;
            checkout.classList.add('disabled');
            totalSpan.innerHTML = '00,00';
        }
    }
}

const newItem = new Cart();

window.addEventListener('load', () => {
    const recipesInStorage = JSON.parse(sessionStorage.getItem('recipesInCart'));
    if(recipesInStorage){
        newItem.recipesInCart = recipesInStorage;
    };
});

document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', () => {
        newItem.incrementCounter();

        const recipeContainer = btn.parentElement;
        const containerName = recipeContainer.querySelector('h3').innerText;
        const containerValue = recipeContainer.querySelector('.price').innerText;

        if(newItem.recipesInCart.length > 0 && newItem.recipesInCart.some(item => item.name === containerName)){
            for(const item of newItem.recipesInCart){
                if(item.name === containerName){
                    item.index += 1;
                };
            };
            sessionStorage.setItem('recipesInCart', JSON.stringify(newItem.recipesInCart));
        } else{
            const itemArr = {name: containerName, value: containerValue, index: 1};
            newItem.recipesInCart.push(itemArr);
            sessionStorage.setItem('recipesInCart', JSON.stringify(itemArr));
        };
    });
});

document.querySelector('.cart-icon').addEventListener('click', () => newItem.showRecipesInCart());

document.querySelector('.close-icon').addEventListener('click', () => popup.style.display = "none");

checkout.addEventListener('click', () => {
    popup.style.display = 'none';
    sessionStorage.setItem('recipesInCart', '');
    document.querySelector('.counter').remove();
    newItem.cartIndex = 0;

    const successMsg = document.querySelector('p');
    successMsg.innerHTML = 'Compra finalizada com sucesso!';
    const successPopup = document.createElement('div');
    successPopup.appendChild(successMsg);
    successPopup.classList.add('success-div');
    document.body.appendChild(successPopup);

    setTimeout(() => {
        successPopup.remove();
    }, 3000);
});
