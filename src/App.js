import React from "react"; //Importuojam React biblioteką
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Iš react-router-dom bibliotekas paimame nurodytus elementus
import 'bootstrap/dist/css/bootstrap.min.css'; //Įkeliame bootstrap stylių klases
import Home from './elements/Home'; //Įkeliame mūsų sukurtus elementus
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';

function App() { //Sukuriame funciją
  return ( //Nurodome ką grąžina funkcija
    <BrowserRouter> {/* Apgaubia visą aplikaciją ir leidžia naudoti routing sistemą. Stebi URL ir pagal adresą nurodo, kurį komponentą rodyti */}
      <Routes> {/* Apgaubia tik viduje nurodytus elementus. Parodo tinkamą komponentą pagal adresą */}
        <Route path='/' element={<Home />} /> {/* Nurodo, kad reikia rodyti 'Home' elementą, esant '/' */}
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} /> {/* ':id' reiškia dinaminį parametrą URL, pvz. /edit/5 redaguos studentą su id=5 */}
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App; //Exportuojam 'App' funkciją, kad kiti failai galetų naudoti šią funkciją