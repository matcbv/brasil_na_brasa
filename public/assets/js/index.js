// ----------- Hero Banner Button -----------

const bannerBtn = document.querySelector('.menu-btn');
const recipesSection = document.querySelector('.recipes-section');

bannerBtn.addEventListener('click', () => {
    recipesSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    })
})

// ----------- Header Animation -----------

const header = document.querySelector('header');

document.addEventListener('scroll', () => {
    if(window.scrollY === 0){
        header.classList.contains('animations') && header.classList.remove('animations');
        header.style.backgroundColor = 'transparent';
    }else{
        header.classList.add('animations');
    };
});

// ----------- Carousel Animation -----------

const carousel = document.querySelector('.recipes');
const arrows = document.querySelectorAll('.arrow');
let items = document.querySelectorAll('.item');

arrows.forEach((arrow) => {
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

const popup = document.querySelector('.popup');
const buttons = document.querySelectorAll('.button');
const cartIcon = document.querySelector('.cart-icon');
const closeIcon = document.querySelector('.close-icon');
const checkout = document.querySelector('.checkout');
const totalSpan = document.querySelector('.total-value');
const itemsContainer = document.querySelector('.items-container');
const cartContainer = document.querySelector('.cart-container');

const cartItem = 
`<p class="recipe-name"></p>
<span class="spacement"> - </span>
<p class="recipe-price"></p>
<div class="quantity-container">
    <img class="quantity-icon remove-icon" src="../public/assets/images/popup/remove_icon.png" alt="Remover">
    <span class="item-count"></span>
    <img class="quantity-icon add-icon" src="../public/assets/images/popup/add_icon.png" alt="Adicionar">
</div>`

let index = 0;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        index += 1;
        const counterSpan = document.querySelector('.counter')
        if(!cartContainer.contains(counterSpan)){
            const counterSpan = document.createElement('span');
            counterSpan.classList.add('counter');
            counterSpan.innerHTML = index;
            cartContainer.prepend(counterSpan);
        } else{
            counterSpan.innerHTML = index;
        };
        
        const recipesInCart = sessionStorage.getItem('recipesInCart');
        const recipeContainer = btn.parentElement;
        const recipeName = recipeContainer.querySelector('h3').innerText;
        const recipeValue = recipeContainer.querySelector('.price').innerText;

        if(recipesInCart){
            let recipesArr = JSON.parse(recipesInCart);
            
            if(recipesArr.some(obj => obj.name === recipeName)){
                recipesArr.forEach(obj => {
                    if(obj.name === recipeName){
                        obj.index += 1;
                    };
                });
            } else{
                recipesArr.push({name: recipeName, value: recipeValue, index: 1});
            };

            sessionStorage.setItem('recipesInCart', JSON.stringify(recipesArr));
        } else{
            const recipesJSON = JSON.stringify([{name: recipeName, value: recipeValue, index: 1}]);
            sessionStorage.setItem('recipesInCart', recipesJSON);
        };
    });
});

cartIcon.addEventListener('click', () => {
    addRecipeInCart();
    popup.style.display = "flex";
});

closeIcon.addEventListener('click', () => popup.style.display = "none" );

function addRecipeInCart(){
    const recipesInCart = sessionStorage.getItem('recipesInCart');
    if(recipesInCart){
        let totalValue = 0;
        const recipesArr = JSON.parse(recipesInCart)
        itemsContainer.innerHTML = '';
        recipesArr.forEach(obj => {
            const {name, value, index} = obj;
            if(index > 0){
                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = cartItem;
                item.querySelector('.recipe-name').innerHTML = name;
                item.querySelector('.recipe-price').innerHTML = value;
                item.querySelector('.item-count').innerHTML = index;
                
                itemsContainer.appendChild(item);
    
                addIconEvents(item, recipesArr)
    
                const valueToSum = (Array.from(value).slice(3, )).join('').replace(',', '.');
                totalValue += parseInt(index, 10) * Number.parseFloat(valueToSum);
                checkout.disabled = false;
            }
        });
        totalSpan.innerHTML = `R$ ${totalValue.toFixed(2)}`;
    } else{
        const p = document.createElement('p');
        p.innerHTML = 'Ops... Seu carrinho está vazio!';
        itemsContainer.innerHTML = '';
        itemsContainer.appendChild(p);
        checkout.disabled = true;
        totalSpan.innerHTML = `R$ 00,00`;
    }
};

function addIconEvents(item, recipesInCart){
    const quantityIcons = item.querySelectorAll('.quantity-icon');
    const itemCount = item.querySelector('.item-count');

    quantityIcons.forEach(icon => {
        if(icon.classList.contains('remove-icon')){
            icon.addEventListener('mouseover', () => {
                itemCount.style.color = '#fb5858';
            });

            icon.addEventListener('click', () => {
                const recipeName = item.querySelector('.recipe-name');
                recipesInCart.forEach(obj => {
                    if(obj.name === recipeName.innerHTML){
                        obj.index -= 1;
                        if (obj.index <= 0){
                            item.remove();
                        }
                        itemCount.innerHTML = parseInt(itemCount.innerHTML) - 1;
                    };
                });
                sessionStorage.setItem('recipesInCart', JSON.stringify(recipesInCart));
            });
        }else{
            icon.addEventListener('mouseover', () => {
                itemCount.style.color = '#6bbb6e';
            });

            icon.addEventListener('click', () => {
                const recipeName = item.querySelector('.recipe-name');
                recipesInCart.forEach(obj => {
                    if(obj.name === recipeName.innerHTML){
                        obj.index += 1;
                        if (obj.index <= 0){
                            item.remove();
                        }
                        itemCount.innerHTML = parseInt(itemCount.innerHTML) + 1;
                    };
                });
                sessionStorage.setItem('recipesInCart', JSON.stringify(recipesInCart));
            });
        }

        icon.addEventListener('mouseleave', () => {
            itemCount.style.color = 'white';
        });
    })
}

checkout.addEventListener('click', () => {
    popup.style.display = 'none';
    sessionStorage.setItem('recipesInCart', '');
    const counter = document.querySelector('.counter');
    counter.remove();
    index = 0;

    const successMsg = document.querySelector('p');
    successMsg.innerHTML = 'Compra finalizada com sucesso!'
    const successPopup = document.createElement('div');
    successPopup.appendChild(successMsg);
    successPopup.classList.add('success-div');
    document.body.appendChild(successPopup);

    setTimeout(() => {
        successPopup.remove();
    }, 3000)
})


