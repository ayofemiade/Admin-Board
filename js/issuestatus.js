const onreview = document.querySelector("#onreview");
const card2 = document.querySelector("#carD2");

function changeColor() {
    if (card2.getAttribute.contains("carD2")) {
        console.log('It does');
    }
}
onreview.addEventListener("click", changeColor);

// const loginAs = document.querySelector(".login-as");
// const dropdownMenu = document.querySelector(".hidden");

// function revealDropdown() {
//   if (dropdownMenu.classList.contains("hidden")) {
//     dropdownMenu.classList.remove("hidden");

//     document.querySelector("ul").addEventListener("click", function (e) {
//       const currentVal = e.target.getAttribute("id");
//       const span = document.querySelector("#loginAs");

//       span.innerText = currentVal;
//     });
//   } else {
//     dropdownMenu.classList.add("hidden");
//   }
// }

// loginAs.addEventListener("click", revealDropdown);