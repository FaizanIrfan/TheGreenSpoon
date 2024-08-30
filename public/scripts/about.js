const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelector('.nav');

open_btn.addEventListener('click', () => {
    nav.classList.add('visible');
});

close_btn.addEventListener('click', () => {
    nav.classList.remove('visible');
});

document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.abouts > div');
    const windowHeight = window.innerHeight;

    elements.forEach(function(element) {
        const positionFromTop = element.getBoundingClientRect().top;
        const elementHeight = element.clientHeight;

        if (positionFromTop < windowHeight - (elementHeight / 2)) {
            element.classList.add('visible');
        }
    });
});

document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.txt-area h1, .txt-area div');
    const windowHeight = window.innerHeight;

    elements.forEach(function(element) {
        const positionFromTop = element.getBoundingClientRect().top;
        const elementHeight = element.clientHeight;

        if (positionFromTop < windowHeight - (elementHeight / 2)) {
            element.classList.add('visible');
        }
    });
});


