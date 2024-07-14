import { useLocation } from "react-router-dom";

function SelectMenu(path) {
    const location = useLocation();

    return location.pathname === path ? "selected-menu" : "";
}

/*
Nav-ban meghívjuk ezt a SelectMenu és megadjuk neki a path-ot, amin éppen vagyunk 
nagyon fontos, hogy ezt úgy kell majd meghívni, hogy egy className-ben, mert amit itt visszaadunk az egy className lesz!!! 
->
<li className={SelectMenu("/")}>
*/ 

export default SelectMenu;