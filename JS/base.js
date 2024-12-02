/*//////////////////////////////////////////////////////////////
    Navigation Bar Toggle for Home Page
//////////////////////////////////////////////////////////////*/

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('#nav-bar');

    menuToggle.addEventListener('click', () => {
        navBar.classList.toggle('active'); // Toggle the 'active' class on click
    });
});
