var sidebarOpen = false;
var sidebar = document.getElementsByClassName("sidebarr");

function openSidebar() {
  if (sidebarOpen) {
    console.log("You clicked");
    sidebar.classList.add(".sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove(".sidebar-responsive");
    sidebarOpen = false;
    console.log("You canceled clicked");
  }
}
