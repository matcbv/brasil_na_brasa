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

arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
        console.log('opa');
        if(arrow.classList.contains('left-span')){
            currentItem -= 1;
        } else{
            currentItem += 1;
        };

        if(currentItem >= maxItem){
            currentItem = 0;
        } else if(currentItem < 0){
            console.log('entreiii')
            currentItem = maxItem - 1;
        }

        items.forEach((item) => {
            item.classList.remove('emphasis');
        });

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth"
        })
    });
});
