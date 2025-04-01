const loginAs = document.querySelector(".login-as");
const dropdownMenu = document.querySelector(".hidden");

function revealDropdown() {
  if (dropdownMenu.classList.contains("hidden")) {
    dropdownMenu.classList.remove("hidden");

    document.querySelector("#ul").addEventListener("click", function (e) {
      const currentVal = e.target.getAttribute("id");
      const span = document.querySelector("#loginAs");

      span.innerText = currentVal;
    });
  } else {
    dropdownMenu.classList.add("hidden");
  }
}

loginAs.addEventListener("click", revealDropdown);

const role = document.querySelector(".role");
const hiddenDropdownMenu = document.querySelector(".hiddenrole");

function reveadropdown0() {
    if (hiddenDropdownMenu.classList.contains('hiddenrole')) {
        hiddenDropdownMenu.classList.remove('hiddenrole');

        document.querySelector("#ul-role").addEventListener("click", function (e) {
            const currentvalue = e.target.getAttribute('id');
            const span0 = document.querySelector('#therole');

            span0.innerText = currentvalue;
        });
    } else {
        hiddenDropdownMenu.classList.add('hiddenrole');
    }
}

role.addEventListener('click', reveadropdown0);