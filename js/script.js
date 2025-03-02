window.addEventListener("scroll", function() {
    var navb = document.querySelector("nav");
    navb.classList.toggle("sticky", window.scrollY > 0);

    var headerScroll = this.document.querySelector("header");
    headerScroll.classList.toggle("sticked-header-offset", this.window.scrollY > 0);
})