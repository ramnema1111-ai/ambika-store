// =========================
// Ambika Store Script
// =========================

const products = [
{
id:1,
name:"Sugar 1kg",
price:48,
image:"https://picsum.photos/300?1"
},
{
id:2,
name:"Toor Dal 1kg",
price:120,
image:"https://picsum.photos/300?2"
},
{
id:3,
name:"Ruchi Oil 750ml",
price:130,
image:"https://picsum.photos/300?3"
},
{
id:4,
name:"Gram Dal 1kg",
price:85,
image:"https://picsum.photos/300?4"
}
];

let cart = {};

const productsDiv = document.getElementById("products");

function loadProducts(){

productsDiv.innerHTML="";

products.forEach(product=>{

productsDiv.innerHTML += `

<div class="product">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<div class="price">₹${product.price}</div>

<div class="qty-box">

<button class="qty-btn" onclick="changeQty(${product.id},-1)">−</button>

<span class="qty" id="qty${product.id}">0</span>

<button class="qty-btn" onclick="changeQty(${product.id},1)">+</button>

</div>

</div>

</div>

`;

});

}

loadProducts();

function changeQty(id,value){

if(!cart[id]) cart[id]=0;

cart[id]+=value;

if(cart[id]<0) cart[id]=0;

document.getElementById("qty"+id).innerText=cart[id];

updateCart();

}

function updateCart(){

let total=0;
let count=0;

const cartItems=document.getElementById("cartItems");

cartItems.innerHTML="";

products.forEach(product=>{

const qty=cart[product.id]||0;

if(qty>0){

const amount=qty*product.price;

count+=qty;

total+=amount;

cartItems.innerHTML += `

<p>

<b>${product.name}</b><br>

${qty} × ₹${product.price} = ₹${amount}

</p>

<hr>

`;

}

});

document.getElementById("cartCount").innerText=count;

document.getElementById("total").innerText=total;

}

document.getElementById("search").addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".product").forEach(card=>{

card.style.display=
card.innerText.toLowerCase().includes(value)
?"block":"none";

});

});

document.getElementById("checkout").onclick=function(){

let msg="🛒 *Ambika Store Order*%0A%0A";

let total=0;

products.forEach(product=>{

const qty=cart[product.id]||0;

if(qty>0){

msg+=`${product.name} x ${qty} = ₹${qty*product.price}%0A`;

total+=qty*product.price;

}

});

msg+=`%0A💰 Total = ₹${total}`;

window.open("https://wa.me/918904523601?text="+msg);

};

