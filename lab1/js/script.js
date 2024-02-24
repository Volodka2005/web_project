document.addEventListener("DOMContentLoaded", function() {

    var menuIcon = document.querySelector('.menu-icon');
    var mainMenu = document.querySelector('.main-menu');

    menuIcon.addEventListener('click', function() {
        if (mainMenu.style.display === 'none' || mainMenu.style.display === '') {
            mainMenu.style.display = 'block';
        } else {
            mainMenu.style.display = 'none';
        }
    });
});

