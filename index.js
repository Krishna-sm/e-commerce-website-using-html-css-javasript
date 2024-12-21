const url = "https://fakestoreapi.com/products"
const cardsContainer = document.getElementById("cards")

let cartData = JSON.parse(localStorage.getItem("cart") ||"[]")
const CartNumber = document.getElementById("cart-num")
const CartNumber1 = document.getElementById("cart-num1")
CartNumber.innerText = cartData.length
CartNumber1.innerText = cartData.length

const ShowCartNumber =()=>{
    CartNumber.innerText = cartData.length
    CartNumber1.innerText = cartData.length
}

const arr =[]
let All_data = []

const fetchAllItem =async()=>{
    try {
        const result = await fetch(url);
        const data = await result.json()
        All_data = data
        let str =``
        for(let i=0;i<data.length;i++){
            str+=` <div class="card col mx-auto" style="width: 18rem;">
                    <img src="${data[i].image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data[i].title}</h5>
                      <p class="card-text">${data[i].category}</p>
                      <button onclick="addItem(this)" id="${data[i].id}" class="btn btn-primary">Add To Cart</button>
                    </div>
                  </div>
                  `
        }
        cardsContainer.innerHTML = str
        
    } catch (error) {
        console.log(error);
        
    }
}


const showCartItems =async()=>{}

const addItem =(e)=>{
        // console.log(e.id); 
        const id = e.id 
        
        
      const exist =  cartData.find((cur)=>cur.id ==parseInt(id)+1)
      console.log(exist);
      
      if(exist){
        const new_data = cartData.map((cur)=>{
            if(cur.id ===parseInt(id)+1){
                return {
                    ...cur,
                    qty:cur.qty+1
                }
            }
            return cur
        })
        cartData = new_data
        console.log("item exist in cart");
        
      }else{
        const item = {
            title:All_data[e.id].title,
            id:All_data[e.id].id,
            price:All_data[e.id].price,
            qty:1
        }

        cartData.push(item)
      }
       
        localStorage.setItem("cart",JSON.stringify(cartData))
        ShowCartNumber()
        

}

fetchAllItem()
ShowCartNumber()