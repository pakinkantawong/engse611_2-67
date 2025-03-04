document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a"); 

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); 
            alert(this.textContent); 
        });
    });
});