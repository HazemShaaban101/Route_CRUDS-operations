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
}

function displayProducts(array = null) {
	if (array === null) {
		var productDisplayHTML = "";
		// loop over the entire array of product objects
		for (var i = 0; i < productList.length; i++) {
			// concatinate the HTML code responsible for displaying product i in the product list
			productDisplayHTML += `<div class="col-md-2 my-2">
						<div
							class="item border border-2 rounded-3 rounded-top-0">
							<img
								src="images/laptop (1).jpg"
								alt="${productList[i].desc}" />
							<h3 class="h6 pt-2 px-2">Code: ${productList[i].code}</h3>
							<p class="h6 px-2">Price: ${productList[i].price}</p>
							<p class="h6 px-2">Category: ${productList[i].category}</p>
							<p class="h6 pb-3 px-2">Desc: ${productList[i].desc}</p>
						</div>
					</div>`;
		}

		// after creating the entire product list HTML, insert it into the innerHTML of the product display area
		document.getElementById("product-display-area").innerHTML =
			productDisplayHTML;
	}
}
