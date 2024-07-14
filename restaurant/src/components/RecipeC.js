/*
A RecipesP végigmentünk egy for-val a recipes-okon, amiket leszedtünk és ott meghívtuk ezt a recipe, ami meg várja a recipes-eket 
és meghívásnál ezt meg is adtuk neki!!!! 
-> 
{
    recipes.map((r, i)=> 
        <RecipeP key={i} r={r}/>
    )
}

Szóval ez lesz majd a főoldal, ahol lesznek a termékek és lesz egy ikon + meg egy ikon - és ott be tudjuk majd állítani, hogy mennyit 
akarunk belerakni a cart-ba
nagyon fontos, hogy itt lesz majd a localStorage!!!! 
elmagyarazas.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ami nagyon fontos, hogy tudunk csinálni a set-vel egyet a get-vel meg tudjuk szerezni az értékét!!!!!! 
Set-nél meg kell adni egy key-t, hogy mi a neve a localStorage-s dolgunknak és egy value-t, hogy mi az 
get-vel meg az egészet meg lehet úgy szerenzi, hogy várja a key-t!!!!!! 

localStorage.clear()-vel meg kitörlünl mindent!!!! mindent, ami benne van a localStorage-ben 
de ha van többminden benne, tehát több kulcs van meg ahhoz adatok és csak az egyiket szeretnénk kitörölni, akkor meg van egy olyan metódus, hogy 
localStorage.removeItem(key), ami meg csak azt törli ki, amelyik key-t meadtuk!!!! 

nagyon fontos, hogy a localStorage az adatokat egy string-ben tárolja (JSON) és ezért ha meg akarjuk szerezni azokat, akkor kell egy 
JSON.parse() ha meg változtatunk valamit rajta és vissza akarjuk tölteni a localStorage-re, akkor meg kell egy JSON.stringify()
!!!!!!!!!!!
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function RecipeC( {r} ) {
    const [quantity, setQuantity] = useState(0);
    const addToCart = ()=> {
        const cart = JSON.parse(localStorage.getItem("cart"));
        //itt megszerezzük a cart nevű localStorage-es dolgot a getItem metódusával!!!, fontos, hogy ez JSON.parse()-olva legyen!!!
        const index = cart.findIndex(rec=>rec.id === r.id);
        /*
        ugy alapból van egy id-ink és amikor feltöltjük a terméket a localStorage-ba ott is megadjuk ugyanazt id-t
        ezt majd látjuk, amikor cart.push()-ba megadunk egy objektumot, hogy milyen adatokat akarunk majd tárolni a localStorage-ban 
        és az a lényeg, hogy kiválasztunk egy terméket, akkor ami itt az index-be van azzal megnézzük, hogy az már fent van-e a localStorage-ban
        mert ha nincs, akkor ez az id-s terméknek nem lesz majd ott az id-ja a localStorage-ben és akkor visszaad -1-et, mert a findIndex()
        ha nem talál megegyezőséget, akkor mindig -1-et ad vissza, ha meg megtalálta, akkor meg annak a terméknek csak a quantity-jét 
        fogjuk növelni!!!!!!! 
        */
        if(index === -1) {
            //ha nincs még a termék a cart-ban, akkor megadjuk, hogy milyen adatokat kell felvinni!!! 
            cart.push({
                id: r.id,
                name: r.name, 
                quantity: quantity,
                price: Math.floor(Math.random()*26)+5 //ez meg csak egy random szám lesz 5-30-ig
            });
        } else {
            //else akkor meg bent van már a cart-ban és az index alapján meg is tudjuk találni, hogy melyik termékről van szó!!!
            cart[index].quantity += quantity; 
            /*
            ez a quantity, azt meg majd mi fogjuk megadni, hogy mennyi legyen és lementjük egy quantity useState-s változóba és majd 
            azzal fogjuk itt növelni a quantity-t meg amikor a push-val elöször felvisszük ott is a quantity-t adtuk meg, tehát 
            a useState-s változó értékét a quantity-nek amit majd felviszünk a localStorage-be!!! 
            */
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        /*
        itt meg felvisszük a módosításokat, amiket elöbb végeztünk a localStorage-re, JSON.stringify!!!!
        nagyon fontos, hogy amiket változtatunk itt azt majd mindig set-elni kell a localStorage-re!!! 
        */
    };

    /*
    ha meg nem létezik a cart localStorage-es változó, akkor meg csinálunk egy egyet!!! fontos, hogy ez egy tömb legyen mindig és majd 
    ebbe push-oljuk bele az objektumokat jelen esetben!!!! 
    */
    useEffect(()=> {
        if(localStorage.getItem("cart") === null) //tehát ha nem létezik, akkor egyenlő null-val!!!!
            localStorage.setItem("cart", "[]"); //akkor csinálunk egy olyan nevűt, hogy cart, aminek az értéke egy üres tömb lesz 

            //és fontos, hogy ezt már egy useEffect-ben, amikor betöltödik a komponens megcsináljuk 
            //localStorage.clear() ezzel meg teljesen ki lehet törölni egy localStorage-et egy ilyet, mint csináltunk a setItem-vel most!!
    }, [])

    /*
    ezzel meg set-eljük a quantity változónkat, tehát a függvény vár egy q-t, amit majd meghívásál megkap 
    és itt majd a + meg - ra hívjuk meg ezt onClickre, tehát vagy -1 vagy +1 lehet a mostani quantity-től függően!!! 
    onClick={()=>adjustQuantity(quantity-1)}

    és fontos, hogy meghatározzuk, hogy mennyi lehet a quantity, mert pl. nem lehet minusz!!!
    */
    const adjustQuantity = (q)=> {
        if(q < 1 || q > 10)
            return //tehát nem lehet kisebb mint egy és nem lehet nagyobb mint 10 a quantity, akkor return!!!! 

        setQuantity(q);
        //itt meg set-eljük a useState-s változó értékét!!!! 
    }

    return(
        <div className="recipe">
            <div className="title">
                <h4>{r.name}</h4>
            </div>

            <div className="recipe-img">
                <Link to={"/recipe/" + r.id} >
                    <img src={r.image} />
                </Link>
            </div>

            <div className="recipe-controls">
                <div>
                    <FontAwesomeIcon className="icon"
                    onClick={addToCart}
                    icon="fa-solid fa-cart-shopping"/>
                </div>

                <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}} >
                    <Fontawesome onClick={()=>adjustQuantity(quantity-1)}
                    className="minus-icon"
                    icon="fa-solid fa-square-minus"/>

                    <input className="sm-input"
                    onChange={e=>setQuantity(e.target.value)} 
                    type="number" readOnly value={quantity}/>

                    <Fontawesome onClick={()=>adjustQuantity(quantity+1)}
                    className="plus-icon"
                    icon="fa-solid fa-square-plus"/>                      

                </div>
            </div>
        </div>
    )
}

export default RecipeC;

/*
Ami nagyon, fontos, hogy van egy kép amire rá akarunk kattintani, akkor elvisz minket egy másik oldalra, illetve url-re 
ehhez kell egy Link, amivel megadjuk az elérési útvonalat és ami itt nagyon fontos, hogy ez attól fog függeni, hogy melyik képre 
kattintunk, hiszen mindegyik kép másmilyen url-re, oldalra kell, hogy vigyen minket 
ezt pedig az -id-val oldottuk meg 
-> 
<Link to={"/recipe/" + r.id} >
    <img src={r.image} />
</Link> 

belülre meg simán beletesszük az img-t!!!! 
<div>
    <FontAwesomeIcon className="icon"
    onClick={addToCart}
    icon="fa-solid fa-cart-shopping"/>
</div>

Ez majd felviszi a terméket a localStorage-re az az ikon ha rákattuntunk onClick-vel!!!!! 
******
<div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}} >
    <Fontawesome onClick={()=>adjustQuantity(quantity-1)}
        className="minus-icon"
        icon="fa-solid fa-square-minus"/>

    <input className="sm-input"
    onChange={e=>setQuantity(e.target.value)} 
    type="number" readOnly value={quantity}/>

    <Fontawesome onClick={()=>adjustQuantity(quantity+1)}
    className="plus-icon"
    icon="fa-solid fa-square-plus"/> 

itt meg van egy adjustQuantity, amivel majd mindig set-eljük a useState-s quantity-nek az értékét!!!!! 
és vár egy quantity-t, amit meg megadunk neki, hogy az eredeti quantity-1 vagy +1 

de viszont, hogy tudjuk, hogy mennyi a quantity ahhoz csináltunk egy input-ot és itt kiszedjük az e.target.value-val, hogy mennyi 
éppen az aktuális quantity 
ami még fontos, hogy ez egy readonly, szóval itt nem tudunk beírni és, hogy value-val hozzá legyen kötve a quantity 
a useState-s quantity-nek az értéke!!!!! 
ez nagyon fontos, hogy input value-nak mindig meg kell adni a useState-s változó értékét!!!!!!!! 
*/