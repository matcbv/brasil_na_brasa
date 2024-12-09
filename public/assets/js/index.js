// ----------- Header Animations -----------

const header = document.querySelector('header');

document.addEventListener('scroll', () => {
    if(window.scrollY === 0){
        header.classList.contains('animations') && header.classList.remove('animations');
        header.style.backgroundColor = 'transparent';
    }else{
        header.classList.add('animations');
    };
});

// ----------- Main Animations -----------

const toLeft = document.querySelector('.left-span');
const toRight = document.querySelector('.right-span');
const carouselContainer = document.querySelector('.recipes-carousel')

toLeft.addEventListener('click', () => {
    const mainDish = document.querySelector('.emphasis');
    const nextDish = mainDish.previousElementSibling;
    mainDish.classList.remove('emphasis');
    nextDish.classList.add('emphasis');
})

toRight.addEventListener('click', () => {
    const mainDish = document.querySelector('.emphasis');
    const nextDish = mainDish.nextElementSibling;
    mainDish.classList.remove('emphasis');
    nextDish.classList.add('emphasis');
})
