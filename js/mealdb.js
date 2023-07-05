document.getElementById('error-message').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    /*----------------------------------------- 
        Spinner will show when data is loading 
    ------------------------------------------ */
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none')
    spinner.classList.add('d-flex')

    /*-------------------------- 
        Clear Search Field 
    ---------------------------*/
    searchField.value = '';

    /*-------------------------------------------------
        Error will show if occurs (API 404 Not found)
    -------------------------------------------------*/
    document.getElementById('error-message').style.display = 'none';


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
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySearchResult(data.meals)
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
        })
        .catch(err => displayError(err));

}

const displayError = (err) => {
    document.getElementById('error-message').style.display = 'block';
    console.log('Error Detail:', err);
}

const displaySearchResult = (meals) => {

    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = ''; Not recommended to remove search result
    searchResult.textContent = '';
    // console.log(meals.length);
    if (!meals) {
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

const loadMealDetail = (mealId) => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
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