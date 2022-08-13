import productsArray from "./products.js";
let filteredProducts = [...productsArray];

let productsParent = document.querySelector(".products");

let companies = Array.from(document.querySelectorAll("ul.categories li"));

//function create card for each product.
function createProductCard() {
  productsParent.innerHTML = filteredProducts
    .map((prod) => {
      const { id, title, company, image, price } = prod;
      return `<div class="product" id="${id}" name="${company}">
                <div class="img">
                    <img src='${image}'/>
                </div>
                <h2>${title}</h2>
                <h3>Price : ${price}</h3>
            </div>`;
    })
    .join("");
}

createProductCard();

let createdProducts = Array.from(document.querySelectorAll(".product"));

//add event listener to list items to access each company products.
companies.forEach((comp) => {
  comp.addEventListener("click", (e) => {
    removeActiveClass();
    e.currentTarget.classList.add("active");
    productsParent.innerHTML = "";
    //divides products according to company.
    createdProducts.filter((p) => {
      return p.getAttribute("name") === comp.id
        ? productsParent.appendChild(p)
        : null;
    });
    if (comp.id === "all") {
      createdProducts.forEach((p) => productsParent.append(p));
    }
  });
});

function removeActiveClass() {
  companies.forEach((c) => {
    c.classList.remove("active");
  });
}
let input = document.querySelector(".sidebar input");
//access the input value, match the value with the title of each product.
input.addEventListener("keyup", () => {
  //display only products that matches the input value.
  filteredProducts = productsArray.filter((p) => {
    return p.title.includes(input.value.toLowerCase());
  });
  createProductCard();
  if (filteredProducts.length < 1) {
    productsParent.innerHTML = `<h1>No Products Match Your Selection</h1>`;
  }
});
input.onblur = () => {
  input.value = "";
};
