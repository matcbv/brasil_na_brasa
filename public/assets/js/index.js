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
const closeIcon = document.querySelector('.close-icon')
const counter = document.querySelector('.counter');
const itemsContainer = document.querySelector('.items-container');

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
        counter.innerText = index;

        const recipesInCart = sessionStorage.getItem('recipesInCart');
        const recipeContainer = btn.parentElement;
        const recipeName = recipeContainer.querySelector('h3').innerText;
        const recipeValue = recipeContainer.querySelector('.price').innerText;

        if(recipesInCart){
            let recipesArr = JSON.parse(recipesInCart);
            
            if(recipesArr.some(obj => obj.recipe === recipeName)){
                recipesArr.forEach(obj => {
                    if(obj.recipe === recipeName){
                        obj.i += 1;
                    };
                });
            } else{
                addRecipeInCart(recipeName, recipeValue)
                recipesArr.push({recipe: recipeName, i: 1});
            };

            sessionStorage.setItem('recipesInCart', JSON.stringify(recipesArr));
        } else{
            const recipesJSON = JSON.stringify([{recipe: recipeName, i: 1}])
            sessionStorage.setItem('recipesInCart', recipesJSON);
        };
    });
});

cartIcon.addEventListener('click', () => popup.style.display = "flex" );
closeIcon.addEventListener('click', () => popup.style.display = "none" );

function addRecipeInCart(itemName, itemValue){
    const item = document.createElement('div');
    item.classList.add('item')
    item.innerHTML = cartItem;
    item.querySelector('.recipe-name').innerHTML = itemName;
    console.log(item.querySelector('.recipe-price'))
    item.querySelector('.recipe-price').innerHTML = itemValue;
    console.log(item.querySelector('.recipe-price'))
    item.querySelector('.item-count').innerHTML = 1;
    itemsContainer.appendChild(item);
    popup.appendChild(itemsContainer);
};

// ----------- Cart Popup Animation -----------

if(document.body.contains(document.querySelector('.popup'))){
    const quantityIcons = document.querySelectorAll('.quantity-icon');
    const itemCount = document.querySelector('.item-count')

    quantityIcons.forEach(icon => {
        icon.classList.contains('remove-icon') ? addEvents(icon, '#fb5858'): addEvents(icon, '#6bbb6e');
    });
};

function addEvents(icon, color){
    icon.addEventListener('mouseover', () => {
        itemCount.style.color = color;
    });

    icon.addEventListener('mouseleave', () => {
        itemCount.style.color = 'white';
    });
};
