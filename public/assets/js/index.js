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

const carousel = document.querySelector('.recipes')
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
