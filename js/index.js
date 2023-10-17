let prdName = document.getElementById('prdName')
let prdPrice = document.getElementById('prdPrice')
let prdDesc = document.getElementById('prdDesc')
let prdCat = document.getElementById('prdCat')
let addBtn = document.getElementById('addBtn')
let updateBtn = document.getElementById('updateBtn')
 
document.querySelector('form').addEventListener('click' , function(e){
e.preventDefault()
})

let products  =[];

if(JSON.parse(localStorage.getItem('products'))!=null){
products=JSON.parse(localStorage.getItem('products'))
}
displayProduct()

function addProduct() {
let prodObj = {
  name:prdName.value,
  price:prdPrice.value,
  category:prdCat.value,
  description:prdDesc.value
}  
products.push(prodObj)
displayProduct()
setLocal()
clearForm()
}




function displayProduct() {
  let tableData = document.getElementById('tableData')
  let all=''
  for(let i=0; i <products.length ; i++){
    all+=`<tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].description}</td>
    <td>
    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Delete</button>
    <button class="btn btn-sm btn-warning" onclick="setProduct(${i})">Update</button>
    </td>
    </tr>
    `
  }
  tableData.innerHTML=all
}

function deleteProduct(index){
products.splice(index , 1 )
displayProduct()
setLocal()
}

let currentIndex=0;
function setProduct(index){
currentIndex=index
  prdName.value=products[index].name
    prdPrice.value=products[index].price
    prdCat.value=products[index].category
    prdDesc.value=products[index].description
    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}


function updateProduct() {
  console.log(currentIndex)
  addBtn.classList.remove('d-none')
  updateBtn.classList.add('d-none')

  let prodObj = {
    name:prdName.value,
    price:prdPrice.value,
    category:prdCat.value,
    description:prdDesc.value
  }  

  products.splice(currentIndex , 1 , prodObj)
displayProduct()
setLocal()
clearForm()
  }




  function setLocal() {
    localStorage.setItem('products' , JSON.stringify(products))
  }


  // ===============================================
function searchProduct(e) {
let search= document.getElementById('search') 
  let tableData = document.getElementById('tableData')
  let all=''
  // console.log(val)
  for(let i=0; i <products.length ; i++){
 if (products[i].name.toLowerCase().includes(search.value.toLowerCase())){
    all+=`<tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].description}</td>
    <td>
    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Delete</button>
    <button class="btn btn-sm btn-warning" onclick="setProduct(${i})">Update</button>
    </td>
    </tr>
    `  
  
 }
}
tableData.innerHTML= all ? all : `<tr><td colspan="5" class=" alert alert-danger text-center">Not Found</td></tr>`
}

// ==========================================

function clearForm() {
  document.querySelectorAll('input').forEach((el)=>el.value ='')
    document.querySelectorAll('textarea').forEach((el)=>el.value ='')
  }