let products = [];
let cart = {};

fetch("products.json")
.then(res => res.json())
.then(data => {
products = data;
showProducts();
});

function showProducts(){

const productsDiv = document.getElementById("products");
productsDiv.innerHTML = "";

products.forEach(product => {

productsDiv.innerHTML += `

<div class="product">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="price">₹${product.price}</div>

<div class="qty-box">

<button class="qty-btn"
onclick="changeQty(${product.id},-1)">−</button>

<span class="qty" id="qty${product.id}">0</span>

<button class="qty-btn"
onclick="changeQty(${product.id},1)">+</button>

</div>

</div>

</div>

`;

});

}

function changeQty(id,value){

if(!cart[id]) cart[id]=0;

cart[id]+=value;

if(cart[id]<0) cart[id]=0;

document.getElementById("qty"+id).innerText=cart[id];

updateCart();

}

function updateCart(){

let cartItems=document.getElementById("cartItems");

let total=0;
let count=0;

cartItems.innerHTML="";

products.forEach(product=>{

let qty=cart[product.id]||0;

if(qty>0){

let amount=qty*product.price;

count+=qty;
total+=amount;

cartItems.innerHTML+=`

<p>

<b>${product.name}</b><br>

${qty} × ₹${product.price}

= ₹${amount}

</p>

<hr>

`;

}

});

document.getElementById("cartCount").innerText=count;
document.getElementById("total").innerText=total;

}

document.getElementById("search").addEventListener("keyup",function(){

const text=this.value.toLowerCase();

document.querySelectorAll(".product").forEach(card=>{

card.style.display=
card.innerText.toLowerCase().includes(text)
?"block":"none";

});

});

document.getElementById("checkout").onclick=function(){

let msg="🛒 *Ambika Store Order*%0A%0A";

let total=0;

products.forEach(product=>{

let qty=cart[product.id]||0;

if(qty>0){

msg+=`${product.name} x ${qty} = ₹${qty*product.price}%0A`;

total+=qty*product.price;

}

});

msg+=`%0A💰 Grand Total : ₹${total}`;

window.open("https://wa.me/918904523601?text="+msg);

};
