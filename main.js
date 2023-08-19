const appId = "ed9751dc"
const appKey = "8527ec5997ae28d32e3ef5efc7ccb2e4"	
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`
const recipeContanier = document.querySelector("#recipe-container")
const txtSearch = document.querySelector("#txtSearch")
const btnFind = document.querySelector(".btn")

btnFind.addEventListener("click",() => loadRecipies(txtSearch.value))

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value
    if(e.keyCode === 13) {
        loadRecipies(inputVal)
    }
})

function loadRecipies(type="paneer"){
    const url=baseUrl+ `&q=${type}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => renderRecipies(data.hits))
        .catch((error) => console.log(error))
}
loadRecipies()

const getRecipeStepsStr = (ingredientLines = []) => {
    let str = ""
    for(var step of ingredientLines) {
        str=str+ `<li>${step}</li>`
    }
    return str
}

const renderRecipies = (recipeList=[]) => {
    recipeContanier.innerHTML = ""
    recipeList.forEach(recipeObj => {
        const { label:recipeTitle, ingredientLines, image:recipeImage  } = recipeObj.recipe
        const recipeStepsStr = getRecipeStepsStr(ingredientLines)
        const htmlStr = `<div class="recipe">
            <div class="recipe-title">${recipeTitle}</div>
            <div class="recipe-img"> 
                <img src="${recipeImage}" alt="">
            </div>
            <div class="recipe-text">
                    <ul>
                        ${recipeStepsStr}
                    </ul>
                </div>
            </div>`
        recipeContanier.insertAdjacentHTML("beforeend" , htmlStr)
    })
}