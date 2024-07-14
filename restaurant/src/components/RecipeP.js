import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/*
Ez az oldal, ahol ha rákattintunk egy képre, akkor meg tudjuk nézni azt a receptet, amire rákattintottunk 
itt nagyon fontos az url, mert ez az id alapján lesz és itt kell majd használni a useParams-ot, hogy attól függően, hogy most a fetch-vel 
id alapján lehoztuk a termékeket egyesével, akkor a useParams segítségével meg tudjuk őket úgy jeleníteni, hogy megjegyezze őket és 
minden egyes id-nak külön url-e lesz   
*/

function RecipeP() {
    const [recipe, setRecipe] = useState(null);
    const {id} = useParams();
    //ez nagyon fontos a useParams az id-re!!!!! 

    const getRecipe = async ()=> {
        const recipe = await fetch("https://dummyjson.com/recipes" + id);
        const json = await response.json();
        setRecipe(json);
    };

    useEffect(()=> {
        getRecipe();
    })

    return(
        <div className="container">
            <Link className="link-icon" to={"/"}>
                <FontAwesomeIcon icon="fa-solid fa-backward-step"/>
            </Link> 

            <div className="recip-page-grid">
                <div className="box">
                    <div className="recipe-page-img">
                        <img src={recipe && recipe.image}/>
                    </div>
                </div>
                <div className="box p-large">
                    <h3>{recipe && recipe.name}</h3>

                    <div className="recipe-date-grid">
                        <div className="white-box">
                            <h4>Cousine</h4>
                            {recipe && recipe.cuisine}
                        </div>

                        <div className="white-box">
                            <h4>Difficulty</h4>
                            {recipe && recipe.difficulty}
                        </div>

                        <div className="white-box">
                            <h4>Calories</h4>
                            {recipe && recipe.caloriesPerServing}
                        </div>

                        <div className="white-box">
                            <h4>Cook Time</h4>
                            {recipe && recipe.cookTimeMinutes}
                        </div>

                        <div className="white-box">
                            <h4>Prepare the meal</h4>
                            {recipe && recipe.prepTimeMinutes}
                        </div>

                        <div className="white-box">
                            <h4>Meal type</h4>
                            {recipe && recipe.mealType.join(", ")}
                        </div>

                        <div style={{gridRow:"3/5", gridColumn:"2/3"}} className="white-box">
                            <h4>Ingredients</h4>
                            <ul className="recipe-list">
                                {
                                    recipe && recipe.ingredients.map((ing, i)=> 
                                        <li key={i}>{ing}</li>
                                    )
                                }
                            </ul>
                        </div>

                        <div style={{gridColumn:"1/3"}} className="white-box">
                            <h4>Instructions</h4>
                            <ul className="recipe-list">
                                {
                                    recipe && recipe.instructions.map((ins, i)=> 
                                        <li key={i}>{ins}</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeP;

/*
Nagyon fontos, hogy ezzel az ilink-vel tudunk majd visszemenni az előző oldalra 
    <Link className="link-icon" to={"/"}>
        <FontAwesomeIcon icon="fa-solid fa-backward-step"/>
    </Link> 

Itt jelenítjük meg id alapján a termékeket, fontos a useParams az id-nek, mert ez egy :-es url változó, tehát ez van az App.js-ben
<Route path='/recipe:id' element={<RecipeP/>}/>
és fontos, hogy ez ilyen formában legyen const {id} = 

Itt csak az csináltuk, hogy van egy container, amiben van egy ikon és utána van egy grid, amiben felosztjuk kettőre a képernyőt 
1. itt lesz a kép 
2. itt lesznek az adatok, de mivel sok adat van ezért ez is majd egy grid lesz, amiben lesznek a box-ot, white-box, amiben megjelenítjük az adatokat

és ami fontos, hogy mindenhol megnézzük, hogy létezik-e a recipe useState-s valami és csak utána jelenítjük meg a dolgokat ha ez igaz 
pl. az img-nél meg az összes többinál is így csináltuk 
->
<img src={recipe && recipe.image}/>
és img-nél fontos, hogy legyen egy egy div körülőtte!! 
-> 
<div className="recipe-page-img">
    <img src={recipe && recipe.image}/>
</div>

ha meg az adat egy objektum-ban van, akkor fontos, hogyan hívatkozunk rá, ha meg egy tömbben van, akkor meg egy map-val végig kell menni 
és megjeleníteni egy li-ben, ami nagyon fontos, hogy benne kell, hogy legyen egy ul-ben!!!!!!!!! 
-> 
<div style={{gridRow:"3/5", gridColumn:"2/3"}} className="white-box">
    <h4>Ingredients</h4>
        <ul className="recipe-list">
            {
                recipe && recipe.ingredients.map((ing, i)=> 
                <li key={i}>{ing}</li>
            )
        }
css 
->
.recipe {
    background: #a9f4e3;
    border:1px solid #8fccbe;
    text-align: center;
    padding:10px;
}

.recipe-img img {
    width:100%;
    height: 250px;
    object-fit: cover;
}

.recipe-controls {
    display:grid;
    grid-template-columns: 1fr 1fr;
    padding:5px;
}

.title {
    height:60px;
    display:flex;
    justify-content: center;
    align-items: center;
}

.icon {
    font-size: 22px;
    cursor:pointer;
    color:#e28b00;
}

.recipe-page-grid {
    display:grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
}

.recipe-page-img img {
    width:100%;
    height:100%;
    object-fit: cover;
    display:block;
}

.box {
    background-color: #a9f4e3;
    border:1px solid #8fccbe;
    margin-left:-1px;
}

.link-icon {
    font-size:22px;
    color: #73a499;
    margin:5px;
}

.recipe-data-grid {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:15px;
}

.white-box {
    background-color: white;
    padding:5px;
    border-radius: 5px;
}
*/