//setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
})

const plants = document.querySelector(".plants");
// const loggedOutLinks = document.querySelectorAll(".logged-out");
// const loggedInLinks = document.querySelectorAll(".logged-in");

// const setupUI = (user) => {
//   if(user) {
//     //toggle UI elements
//     loggedOutLinks.forEach((item) => (item.style.display = "none"));
//     loggedInLinks.forEach((item) => (item.style.display = "block"));
//   }else{
//     loggedOutLinks.forEach((item) => (item.style.display = "block"));
//     loggedInLinks.forEach((item) => (item.style.display = "none"));
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
  // Add plants
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
});

// //populate data
// const setupPlants = (data) => {
//   let html = "";
//   data.forEach((doc) => {
//     const plant = doc.data();
//     const li = `
//     <div class="card-panel plant white row" data-id ="${plant.id}">
//             <img src="/img/plant.png" class="responsive-img materialboxed" alt="">
//             <div class="plant-detail">
//                 <div class="plant-title">${plant.title}</div>
//                 <div class="plant-description">${plant.description}</div>
//             </div>
//             <div class="plant-delete">
//                 <i class="material-icons" data-id ="${plant.id}">delete_outline</i>
//             </div>
//         </div>
//     `;
//     html += li;
//   });
//   plants.innerHTML = html;
// }

const renderPlant = (data, id) => {
    const html = `
    <div class="card-panel plant white row" data-id ="${id}">
            <img src="/img/plant.png" class="responsive-img materialboxed" alt="">
            <div class="plant-detail">
                <div class="plant-title">${data.title}</div>
                <div class="plant-description">${data.description}</div>
            </div>
            <div class="plant-delete">
                <i class="material-icons" data-id ="${id}">delete_outline</i>
            </div>
        </div>
    `;

    plants.innerHTML += html;
};

//remove plant from DOM
const removePlant = (id) => {
    const plant = document.querySelector(`.plant[data-id ="${id}"]`);
    // console.log(plant);
    plant.remove();
  };