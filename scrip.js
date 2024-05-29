const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("carrinho-modal")
const cartItemsConteiner = document.getElementById("items-carrinho")
const cartTotal = document.getElementById("total-compras")
const checkoutBtn = document.getElementById("btn-finalizar")
const closeModal = document.getElementById("btn-fechar")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarning = document.getElementById("address-warn")

let cart = []

cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModal.addEventListener("click", function(event){
    if(event.target === closeModal){
        cartModal.style.display = "none"
    }
})

checkoutBtn.addEventListener("click", function() {
    if (addressInput.value.trim() === "") {
        addressWarning.style.display = "flex";
    } else {
        addressWarning.style.display = "none";
    }
});


//criando uma variavel que vai pegar o item dentro da class add-to-cart-btn
// "parent" pega o button e o icone dentro dele

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        //pegando os atributos de nome e preço definidos no html
        const name = parentButton.getAttribute("data-name")

        //usando o parseFloat para aparecer como numero
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
    }
})


// function para add no carrinho

function addToCart(name, price){
  cart.push({
    name,
    price,
    quantity: 1,
  })
}
