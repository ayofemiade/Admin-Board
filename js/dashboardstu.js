var sidebarClose = true;
var sidebar = document.querySelector(".sidebarr");

function openSidebar() {
  if (sidebarClose) {
    sidebar.classList.add("sidebar-responsive");
    sidebarClose = false;
  }
}

function closeSidebar() {
  if (sidebarClose == false) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarClose = true;
  }
}
