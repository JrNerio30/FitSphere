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


/*//////////////////////////////////////////////////////////////
    Cart Summary Toggle
//////////////////////////////////////////////////////////////*/
openCartSummary.addEventListener('click', () => {
    cartSummary.classList.toggle('open');
});

function updateCartSummary(){
    if (window.innerWidth > 700) {
        cartSummary.classList.add('open');
        return;
    }else{
        cartSummary.classList.remove('open');
    }
}

updateCartSummary();
window.addEventListener('resize', updateCartSummary);