const carousel = document.querySelector('.recipes-carousel');
const toRigth = document.querySelector('.right-span');
const toLeft = document.querySelector('.left-span');

toRigth.addEventListener('click', () => {
    const emphasisItem = carousel.querySelector('.emphasis');
    const nextItem = emphasisItem.nextElementSibling.nodeName !== "DIV" ? emphasisItem.nextElementSibling.nextElementSibling: emphasisItem.nextElementSibling;
    nextItem.classList.add('emphasis');
    emphasisItem.classList.remove('emphasis');
    carousel.appendChild(carousel.removeChild(emphasisItem));
});