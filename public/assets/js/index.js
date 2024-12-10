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

const carousel = document.querySelector('.recipes')
const arrows = document.querySelectorAll('.arrow');
const items = document.querySelectorAll('.item');

let currentItem = 2;
const maxItem = items.length;

arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
        if(arrow.classList.contains('left-span')){
            currentItem -= 1;
            console.log(items[maxItem - 1])
            carousel.insertBefore(items[maxItem - 1], carousel.firstChild);
            carousel.lastChild.remove();
        } else{
            currentItem += 1;
            carousel.appendChild(items[0])
            items[0].remove();
        };

        if(currentItem >= maxItem){
            currentItem = 0;
        } else if(currentItem < 0){
            currentItem = maxItem - 1;
        }

        items.forEach((item) => {
            item.classList.remove('emphasis');
        });

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
            block: "nearest"
        })

        items[currentItem].classList.add('emphasis');
    });
});
