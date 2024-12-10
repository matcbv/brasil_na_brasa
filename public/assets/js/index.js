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

const arrows = document.querySelectorAll('.arrow');
const items = document.querySelectorAll('.item');

let currentItem = 0;
const maxItem = items.length;

arrows.forEach(arrow, () => {
   arrow.addEventListener('click', () => {
      
   })
})
