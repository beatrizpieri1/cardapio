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

checkoutBtn.addEventListener("click", function(event){
    if(event.target === addressInput === false){
       addressWarning.style.display = "flex"
    } 
})
