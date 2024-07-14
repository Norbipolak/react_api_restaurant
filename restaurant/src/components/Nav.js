import { Link, Outlet } from "react-router-dom";
import SelectMenu from "./SelectMenu";
/*
ha meg ez a SelectMenu nem ebbe a mappában lenne, mint ez a Nav, akkor ki kellene menni, belemenni a mappájába és ugy tudnánk elérni!!
import SelectMenu from "../functions/SelectMenu";
*/

function Nav() {
    return(
        <>
            <nav>
                <ul>
                    <li className={SelectMenu("/")}>
                        <Link to='/'>Foods</Link>
                    </li>
                    <li className={SelectMenu("/cart")}>
                        <Link to='/cart'></Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default Nav;