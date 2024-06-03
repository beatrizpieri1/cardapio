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
    updateCartModal()
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
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1
    }else{
     cart.push({
    name,
    price,
    quantity: 1,
  })
}

updateCartModal()

}



//update carrinho

function updateCartModal(){
    cartItemsConteiner.innerHTML = ""
    let total = 0

    cart.forEach(item =>{ 
        const cartItemElement = document.createElement("div")

        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">

        <div>
          <p class="font-bold">${item.name}</p>
          <p>${item.quantity}</p>
          <p class="font-medium mt-2"> $ ${item.price.toFixed(2)}</p>
        </div>
        
        
        <button class="btnRemove" 
        data-name="${item.name}">
          Remove
        </button>
       
        
        </div>

        `
        total += item.price * item.quantity

        cartItemsConteiner.appendChild(cartItemElement)
    }) 

        cartTotal.textContent = total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })

        cartCounter.innerText = cart.length
    
}
// fim update carrinho

//remove item

 cartItemsConteiner.addEventListener("click", function (event){
    if(event.target.classList.contains ("btnRemove")){
        const name = event.target.getAttribute("data-name")

         removeItemCart(name)
    }
 })

 function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]
        
        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
 }
//fim remove item


//finalizar pedido
 addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarning.classList.add("hidden")
    }
 })

 checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0 ) return

    if(addressInput.value === ""){
      addressWarning.classList.remove("hidden")
      addressWarning.classList.add("border-red-500")
      return
    }

//api enviar pedido
 const cartItems = cart.map((item) => {
    return(
        `${item.name} Quantidade: (${item.quantity}) Preço: $ ${item.price} | `
    )
 }).join("")
console.log(cartItems)

const message = encodeURIComponent(cartItems)

const phone = "5514991302204"
window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

})