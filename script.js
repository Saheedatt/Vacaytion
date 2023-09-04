const app = {
    pages: [],
    init: function () {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        });
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        });
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
        app.useBackgroundImage('home');
    },
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage);
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);

        app.useBackgroundImage(currentPage);
    },
    poppin: function (ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash);
        document.getElementById(hash).dispatchEvent(app.show);

        app.useBackgroundImage(hash); 
    },
    useBackgroundImage: function (currentPage) {
        const container = document.querySelector('.container');
        if (currentPage === 'home') {
            container.style.backgroundImage = 'url(images/pexels-roberto-nickson-2659629.jpg)';
        } else {
            container.style.backgroundImage = 'none';
        }
    },
};

document.addEventListener('DOMContentLoaded', app.init);
