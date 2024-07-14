import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipesP from './components/RecipesP';
import RecipeP from './components/RecipeP';
import Nav from './components/Nav';
import CartP from './components/CartP';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare, faBackwardStep, faCartShopping, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
library.add(
    faCartShopping,
    faArrowUpRightFromSquare,
    faBackwardStep,
    faSquarePlus,
    faSquareMinus
);

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav/>}>
                    <Route index element={<RecipesP/>}/>
                    <Route path='/recipe:id' element={<RecipeP/>}/>
                    <Route path='cart' element={<CartP/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
