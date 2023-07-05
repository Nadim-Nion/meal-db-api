const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    /*-------------------------- 
      Clear Search Field 
    ---------------------------*/
    searchField.value = '';

    if (searchText == '') {
        /*  alert('Text field can not be empty');
         return; */
        const searchResult = document.getElementById('search-result');
        const div = document.createElement('div');
        div.style.marginLeft = '500px';
        div.innerHTML = `
         <h1>Text field can not be empty</h1>
         `;
        searchResult.appendChild(div);
        return;
    }

    /*----------------------------------------------- 
        Load Data after fetching dynamic URL
    ------------------------------------------------*/
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
    }
    catch (err) {
        console.log('Error detail:', err);
    }

    /* fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals)); */
}

const displaySearchResult = (meals) => {

    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = ''; Not recommended to remove search result
    searchResult.textContent = '';
    // console.log(meals.length);
    if (meals == null) {
        const div = document.createElement('div');
        div.style.marginLeft = '500px';
        div.innerHTML = `
         <h1>No results found</h1>
         `;
        searchResult.appendChild(div);
        return;

    }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 251)}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = async (mealId) => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    /* fetch(url)
         .then(res => res.json())
         .then(data => displayMealDetail(data.meals[0])); */
}


const displayMealDetail = (meal) => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 151)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    
    `;
    mealDetails.appendChild(div);
}