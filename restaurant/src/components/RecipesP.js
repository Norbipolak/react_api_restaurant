/*
Fontos, hogyha a függvényt nem return-ben kell meghívni pl. itt nem egy button-re csináltunk, hanem csak simán lejönnek a dolgok, akkor 
egy useEffect-ben kell ezt meghívni

fontos, hogy a lehívott adatokat egy helyi változóba lementsük, mert úgy tudunk majd végigmenni rajtuk egy map-val!!!! 

Ami a legfontosabb, hogy amikor végigmegyünk a map-val, akkor meghívjuk a RecipeC, mert majd ott fogjuk megjeleníteni az adatokat, amiket majd 
megkapunk itt a map-ból!!!!
szóval az majd vár egy r-t a recipes.map((r, i)=> <RecipeC key={i} r={r}/>) 
itt átadjuk majd az adatokat, ott meg a másikon megjelenítjük, amit akarunk r.valami így!!!! 
*/

function RecipesP() {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async ()=> {
        const response = await fetch("https://dummyjson.com/recipes");
        //itt JSONparse-oljuk!!! a másik metódus meg a json.stringify() 
        const json = response.json();
        console.log(json);
        setRecipes(json.recipes);
    };

    useEffect(()=> {
        getRecipes();
    }, []);

    return(
        <div className="container">
            <div className="recipes-grid">
                {
                    recipes.map((r, i)=> 
                        <RecipeP key={i} r={r}/>
                    )
                }
            </div>
        </div>
    );
}

export default RecipesP;
