const carousel = document.querySelector('.recipes-carousel');
const toRigth = document.querySelector('.right-span');
const toLeft = document.querySelector('.left-span');
const menuBtn = document.querySelector('.menu-btn');

toRigth.addEventListener('click', () => {
    const emphasisItem = carousel.querySelector('.emphasis');
    const nextItem = emphasisItem.nextElementSibling.nodeName !== "DIV" ? emphasisItem.nextElementSibling.nextElementSibling: emphasisItem.nextElementSibling;
    nextItem.classList.add('emphasis');
    emphasisItem.classList.remove('emphasis');
    carousel.appendChild(carousel.removeChild(emphasisItem));
});

// Evento para ativar prompt do prato do dia
menuBtn.addEventListener('click', () => {
    const nome = prompt("Digite seu nome:");

    const pratos = ["Feijoada", "Lasanha", "Strogonoff", "Macarrão", "Pizza", "Sushi", "Frango"];

    const diaSemana = new Date().getDay();

    const pratoDoDia = pratos[diaSemana];

    const mensagem = `Olá, ${nome}! O prato do dia é ${pratoDoDia}!`;

    alert(mensagem);
})

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