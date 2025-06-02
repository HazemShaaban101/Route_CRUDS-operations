// product list JSON retrieval
if (localStorage.getItem("productList") === null) {
	// if no productList is saved in localStorage, create an empty productList array
	var productList = [];
} else {
	// if productList is found in localStorage, retrieve and parse it into a variable called ProductList
	var productList = JSON.parse(localStorage.getItem("productList"));

	displayProducts();
}

function addProduct() {
	var product = {
		code: document.getElementById("product-code").value,
		price: document.getElementById("product-price").value,
		category: document.getElementById("product-category").value,
		desc: document.getElementById("product-desc").value,
		image: document.getElementById("product-image").value,
	};
	// add product object into productList array
	productList.push(product);

	// clear input boxes
	clearInputs();

	// update local storage to the latest product list
	localStorage.setItem("productList", JSON.stringify(productList));

	// display new list of products
	displayProducts();
}

function clearInputs() {
	// reset values of all input boxes
	document.getElementById("product-code").value = "";
	document.getElementById("product-price").value = "";
	document.getElementById("product-category").value = "";
	document.getElementById("product-desc").value = "";
	document.getElementById("product-image").value = "";
	document.getElementById("search-bar").value = "";
}

function displayProducts(array = null) {
	var productDisplayHTML = "";
	if (array === null) {
		// loop over the entire array of product objects
		for (var i = 0; i < productList.length; i++) {
			// concatinate the HTML code responsible for displaying product i in the product list
			productDisplayHTML += `<div class="col-md-2 my-2">
						<div
							class="item border border-2 rounded-3 rounded-top-0">
							<img
								src="./images/${productList[i].image.slice(
									productList[i].image.lastIndexOf("\\") + 1
								)}"
								alt="${productList[i].desc}" />
							<h3 class="h6 pt-2 px-2">Code: ${productList[i].code}</h3>
							<p class="h6 px-2">Price: ${productList[i].price}</p>
							<p class="h6 px-2">Category: ${productList[i].category}</p>
							<p class="h6 pb-1 px-2">Desc: ${productList[i].desc}</p>
							<div class="text-center px-2">
								<button onclick="editProduct(${i})" class="btn btn-outline-warning w-100 mb-2">Edit info</button>
							<button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 mb-2">Delete product</button>
							</div>
						</div>
					</div>`;
		}
	} else {
		for (var i = 0; i < array.length; i++) {
			// loopp over input array and display products at the indexes saved in the array
			productDisplayHTML += `<div class="col-md-2 my-2">
						<div
							class="item border border-2 rounded-3 rounded-top-0">
							<img
								src="./images/${productList[array[i]].image.slice(
									productList[array[i]].image.lastIndexOf(
										"\\"
									) + 1
								)}"
								alt="${productList[array[i]].desc}" />
							<h3 class="h6 pt-2 px-2">Code: ${productList[array[i]].code}</h3>
							<p class="h6 px-2">Price: ${productList[array[i]].price}</p>
							<p class="h6 px-2">Category: ${productList[array[i]].category}</p>
							<p class="h6 pb-1 px-2">Desc: ${productList[array[i]].desc}</p>
							<div class="text-center px-2">
								<button onclick="editProduct(${
									array[i]
								})" class="btn btn-outline-warning w-100 mb-2">Edit info</button>
							<button onclick="deleteProduct(${
								array[i]
							})" class="btn btn-outline-danger w-100 mb-2">Delete product</button>
							</div>
						</div>
					</div>`;
		}
	}
	// after creating the entire product list HTML, insert it into the innerHTML of the product display area
	document.getElementById("product-display-area").innerHTML =
		productDisplayHTML;
}

// delete function: this function removes product object from the product list array
function deleteProduct(productIndex) {
	productList.splice(productIndex, 1);
	searchProduct();

	// update local storage to the latest product list
	localStorage.setItem("productList", JSON.stringify(productList));
}

// search function: this function takes input from search bar everytime the value changes
// using the oninput property. it then finds products that contain the keyword written in
// the searchbox and displays it.
function searchProduct() {
	var productCode = document.getElementById("search-bar").value;
	var arrayOfProducts = [];

	// loop over all products and find ones that contain the keyword inside searchbox
	for (var i = 0; i < productList.length; i++) {
		if (productList[i].code.includes(productCode)) {
			// if a matching product is found, push the index into an array for the display function
			arrayOfProducts.push(i);
		}
	}

	// utilize the newer displayproducts function that takes an array
	displayProducts(arrayOfProducts);
}

function editProduct(productIndex) {
	// add cancel edit button
	if (document.getElementById("cancel-button") === null) {
		document.querySelector(
			".form .container"
		).innerHTML += `<button class="btn btn-danger" id="cancel-button" onclick="returnAddButton()">Cancel edit</button>`;
	}

	// push product info into boxes
	document.getElementById("product-code").value =
		productList[productIndex].code;
	document.getElementById("product-price").value =
		productList[productIndex].price;
	document.getElementById("product-category").value =
		productList[productIndex].category;
	document.getElementById("product-desc").value =
		productList[productIndex].desc;

	// turn add button to edit button
	document.getElementById("add-button").classList.remove("btn-primary");
	document.getElementById("add-button").classList.add("btn-warning");
	document.getElementById("add-button").innerHTML = "Save edits";
	document
		.getElementById("add-button")
		.setAttribute("onclick", `saveEditedProduct(${productIndex});`);
}

function saveEditedProduct(productIndex) {
	// get new values from input boxes
	var product = {
		code: document.getElementById("product-code").value,
		price: document.getElementById("product-price").value,
		category: document.getElementById("product-category").value,
		desc: document.getElementById("product-desc").value,
		image: document.getElementById("product-image").value,
	};

	// save new info into the edited product's object inside the productList
	productList[productIndex].code = product.code;
	productList[productIndex].price = product.price;
	productList[productIndex].category = product.category;
	productList[productIndex].desc = product.desc;

	// check if user changed the picture. if not then don't edit the pic
	if (product.image !== "") {
		productList[productIndex].image = product.image;
	}

	// return the add button
	returnAddButton();

	// update local storage to the latest product list
	localStorage.setItem("productList", JSON.stringify(productList));

	// display new list of products while keeping search criteria
	searchProduct();
}

function returnAddButton() {
	// return the old properties of the add button
	document.getElementById("add-button").classList.remove("btn-warning");
	document.getElementById("add-button").classList.add("btn-primary");
	document.getElementById("add-button").innerHTML = "Add product";
	document
		.getElementById("add-button")
		.setAttribute("onclick", "addProduct();");

	// clear input boxes while retaining search box value
	var searchValue = document.getElementById("search-bar").value;
	clearInputs();
	document.getElementById("search-bar").value = searchValue;

	// remove cancel button
	document.getElementById("cancel-button").remove();
}
