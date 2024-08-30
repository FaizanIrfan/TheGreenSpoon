const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelector('.nav');
const search_btn = document.getElementById('search_btn');
const categories = document.querySelector('.categories');

search_btn.addEventListener('click', () => {
    categories.innerHTML = '<input type="text">';
});

open_btn.addEventListener('click', () => {
    nav.classList.add('visible');
});

close_btn.addEventListener('click', () => {
    nav.classList.remove('visible');
});

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    items.forEach(item => {
        observer.observe(item);
    });
});