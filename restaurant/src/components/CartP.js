/*
ez lesz majd a cart oldal, itt lehet majd növelni és csökkenteni is a quantity-t -> modifyQuantity és ugyanúgy, mint az elöbb egy sima useEffect-ben 
az elején megcsináljuk a cart localStorage-t ha még nem létezik!!! 
Majd lesz egy segédfüggvény, ami findIndex-el a cart-on, hogy már beleraktuk-e a terméket vagy nem és ha igen, akkor id alapján megtalálja azt!!

a delFood-val pedig tudunk terméket is törölni az majd úgy lesz, hogy a findIndex-es segédfüggvényt felhasználva megtaláljuk id alapján a terméket 
ezután, mint itt React-ben szokás létrehozunk egy spread operator-os tömbmásolatot, abból kivesszük a splice-val index alapján amit akarunk 
és utána a useState-s változót pedig a módosított tömbbel frissítjük 
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function CartP() {
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);


    useEffect(() => {
        const cartStr = localStorage.getItem("cart");
        //Itt lementjük a lokális változóba a cart-ot, tehát a localStorage-nak a getiItem-jével megszerezzük a cart nevű, kulcsú valamit 
        if (cartStr)
            setCart(cartStr);

        /*
        És ha van ilyenünk, hogy cartStr, tehát le tudtuk szedni onnan az adatokat, akkor ezzel set-eljük a óz itt létrehozott 
        Cart-os useState-s változónkat, hogy meg legyen az adatok, amik kellenek!!!!!
        */
    }, []);

    const findIndex = (id) => {
        return cart.findIndex(f => f.id === id);
        /*
        itt visszaadjuk return-vel amit kell, mert ez csak egy segédfüggvény, vár egy id-t, amit majd megadunk neki meghívásnál 
        itt ugyanaz van mint az elöbb, hogy van egy id-ja a terméknek és van egy id-ja a localStorage-ben is és ha ott létezik, akkor 
        megtalálja id alapján a terméket a cart-ban, hiszen arra csináltuk az egészet!!!!!! 
        és akkor ki lehet venni onnan, meg a cart-os useState-s változóból is!!!! 
        */
    };

    const modifyQuantity = (id, amount) => {
        //vár egy id-t ,hogy melyik termékről van szó és vár egy amount-ot, hogy mennyivel akarjuk ezt megváltoztatni, de itt majd lesznek 
        //kikötések, hogy mondjuk a nem lehet a quantity kisebb, mint egy meg nem lehet az amount pl. -1 
        const index = findIndex(id);
        //megadjuk neki majd azt az id-t amit ennek a meghívásánál bekérünk, mert a findIndex vér egy id-t, azt majd itt megadjuk neki
        //de viszont nem tudjuk itt azonnal, ezért ez is kér majd egy id-t és meghívásnál megkapja!! 

        const cTemp = [...cart];
        //cart tömb másolata a spread operator-val egy változóban, azért is kell egy új tömbmásolat, mert a splice megváltoztatná az eredeti tömböt 

        const f = cTemp[index];
        //megkeressük, hogy a tömbmásolatban melyik indexű termékkel akarunk valamit csinálni 

        if (f.quantity <= 1 && amount === -1)
            return;
        //ha a quantity az 1 vagy kisebb és az amount -1, akkor return, mert akkor 0 lenne a quantity, azt meg itt a cart-ban nem akarjuk!!! 

        f.quantity += amount;
        //hozzáadjuk a quanity-hez az amount-ot, amivel meg akarjuk változtatni!!!! 

        cTemp.splice(index, 1);
        //kivesszük majd a terméket és majd újra belerakjuk a setCart-val a már módosított quantity-s terméket!!!!!! 
        setCart(c => [...cTemp, f]);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        /*
        1. legyen egy termék, amit megtalálunk index alapján a módisított tömbben és el legyen mentve egy változóban 
        2. annak megnöveljük a quantity-jét jelen esetben, de bármilyen változtatást lehet vele csinálni 
        3. a régit kiszedjük a módosított tömbböl, tehát most a módosított tömbben egyel kevesebb lesz 
        4. set-eljük a useState-s változót a módosított tömbre, amiben jelenleg egyel kevesebb van és még arra 
            az egyre amit termékre, amit lementettünk egy változóban és megváltoztattuk valamilyét!!!!! 
        */

    }

    /*
    delete meg a szokásos módon 
    1. bekérünk egy id-t, hogy melyik terméket, akarjuk törlni 
        megtaláljuk a findIndex-vel a helyről ahonnan törölni szeretnénk, itt van egy segédfüggvény is hozzá 
    2. létrehozunk egy másolatot a tömbnek 
    3. index alapján a splice-val kivesszük belőle 
    4. set-eljük a useState-s változonkat a módosított tömbre 
    */
    const delFood = (id) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        cTemp.splice(index, 1);
        setCart(cTemp);
    }

    /*
    emptyCart, hogy kitörlünk mindent, tehát egy üres tömböt adunk meg a cart useState-s változónak és a localStorage-on is 
    egy üres tömböt a cart kulcsú valaminek!!!! 
    */
    const emptyCart = () => {
        setCart([]);
        localStorage.setItem("cart", "[]");
    }

    //ez a függvény meg abc sorrend-be rakja, amit akarunk!!!! fontos, hogy ezt fel lehet majd használni bárhol!!!! 
    const sort = (a, b) => {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        return 0;
    }

    //és itt a useEffect-ben ezt fel is használjuk a cart tömbre, hogy abc sorrendben legyenek a termékek!!! 
    useEffect(() => {
        cart.sort((a, b) => {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            return 0;
        });

        setQuantity(cart.reduce((subTotal, f) => subTotal + f.quantity, 0));
        //setQuantity meg arra fogjuk set-elni, hogy összes elemnek a f.quantity-jét összeadjuk a reduce-val!!!! 

        setPrice(cart.reduce((subTotal, f) => subTotal + f.price, 0));
        //price meg ugyanez lesz, hogy az összes termék price-át összeadjuk a reduce-val a cart tömmből!!! 


        localStorage.setItem("cart", JSON.stringify(cart));
        /*
        nagyon fontos, hogy ha bármilyen változás van a cart-os változóban, akkor a localStorage-t is kell mindig 
        frissíteni a cart-val, hogy ott is mindig az legyen, mint itt a cart-os useState-s változóban!!!! 
        nagyon fontos, hogy JSON.strigify-olva legyen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        */

    }, [cart]) //a cart változására kell, hogy lefusson, mert ha új terméket rakunk bele, akkor az abc sorrend is más lesz!!!! 

    return (
        <div className="container">
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Price*Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.sort(sort).map((f, i) =>
                            <tr key={i}>
                                <td>{f.name}</td>
                                <td style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, -1)}
                                        className="minus-icon"
                                        icon="fa-solid fa-square-minus" />

                                    <input className="sm-input" readOnly
                                        type="number" value={f.quantity} />

                                    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, 1)}
                                        className="plus-icon"
                                        icon="fa-solid fa-square-plus" />
                                </td>
                                <td>{f.price}</td>
                                <td>{f.price*f.quantity}</td>
                                <td>
                                    <button onClick={delFood}>Delete</button>
                                </td>
                            </tr>
                        )
                    }

                    <tr>
                        <th>
                            Total
                        </th>
                        <th>
                            {quantity}
                        </th>
                        <th>
                            {price} $
                        </th>
                        <th>
                            <button onClick={emptyCart}>Empty Cart</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CartP;

/*
Ami nagyon fontos a table-nek a felépítése 
table -> thead -> tr -> th
      -> tbody -> tr -> td 

itt csináltunk egy thead-et és oda beírtukn a th-ban, hogy miket fogunk majd megjeleníteni (name, price stb.)

a tbody-ban megjelenítjük egyes termékeknek a price-t stb. 
quantity-nél csinálunk egy olyat, mint a másik oldalon is 
lesz két fontAwesome mindegyik-hez onClick-re lesz egy függvény ami egyel növeli vagy csökkenti 
az lesz az amount és itt megadjuk az id-t is, hogy melyik termékről van szó!!!!!!!!!! 

lesz egy input, amihez hozzá lesz kötve value-nak a quantity!!! 
f.quantity, mert az a termék ára az itteni quantity useState-s az összes termék ára összesen!!!!!! 

<td style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, -1)}
        className="minus-icon"
        icon="fa-solid fa-square-minus" />

    <input className="sm-input" readOnly
        type="number" value={f.quantity} />

    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, 1)}
        className="plus-icon"
        icon="fa-solid fa-square-plus
*/ 