// Get the path or location of the window document or location server
const windowPathname = window.location.pathname;

// Selects all class with the sidebar class
const navLinkEls = document.querySelectorAll('.sidebar-list-items');

// Loop through
navLinkEls.forEach((navLink) => {
    const navLinkPathname = new URL(navLink.href).pathname;
    if (navLinkPathname === windowPathname) {
        navLink.classList.add("active");
    }
    console.log(navLinkPathname);
});