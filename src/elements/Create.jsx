import React, { useState } from 'react'; //Imprtuojam React biblioteką, ir useState metodą, kuris leidžia klientui redaguoti kintamojo duomenis
import axios from 'axios'; //Importuojam axios biblioteką, kuri leidžia siųsti HTTP užklausas į serverį
import {Link, useNavigate} from 'react-router-dom'; //Importuojame elementus iš react-router-dom bibliotekas. Link yra React'o '<a>' analogas, kuris leidžia naviguoti klientui tarp puslapių. useNavigate, leidžia perkelti klientą i tam tikrą puslapį po tam tikrų veiksmų

function Create() { //Sukuriame funkciją, kuri leis klientui sukurti naują studentą
    const [values, setValues] = useState({ //Sukuriame masyvą, kuriame 'values' kintamajame bus saugomi gauti iš kliento studento duomenis. setValues leidžia redaguoti duomenis. 'useState' metodas, kurio dėka galime viską tai atlikti React'o aplinkoje
        name: '', //Studento duomenys, kurie iškarto būna tušti
        email: '',
        age: '',
        gender: '',
    });

    const navigate = useNavigate(); //Funkcija, leidžianti programiškai nukreipti vartotoją į kitą puslapį


    function handleSubmit(e) { //Sukuriame funkciją, kuri patvirtinus į formą įvestus duomenis perduoda juos į serverį
        e.preventDefault(); //Išjugiame formos default'inį elgesį, t.y. kai klientas patvirtina įvestus duomenis puslapis nera perkraunamas automatiškai

        axios.post('/add_user', values) //Siunčiame į serverį POST užklause adresu - "/add_user". Užklausoje perduodame studento duomenis (values)
        .then((res) => { //Jeigu užklausa yra sėkminga:
            navigate('/'); //Perkeliame klientą į '/' (Home puslapį)
            console.log(res.data); //Išveda atsakyma į serverio consolę (visas axios objektas. Reikai nurodyti res.data, kad gauti tik serverio gražintus duomenis)
        })
        .catch((err) => console.log(err)) //Jeigu iškyla klaida išvedame ją į console
    };

    return ( //Nurodome, kad Create funkcija turėtų atvaizduoti klientui
        <div className="container-fluid vh-100 vw-100 bg-primary p-5">
            <div className="row">
                <h3>Add Student</h3>
                <form onSubmit={handleSubmit}> {/* Sukuriame formą, į kurią suvedus duomenis ir patvirtinus yra iškviečiama 'handleSubmit' funkcija */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" onChange={e => setValues({...values, name: e.target.value})} /> {/* Inputas, į kurį įvedus tam tikrus studento duomenis (šiuo atveju 'name') yra keičiama defaultinė 'name' reišmę į input suvestą reikšmę. setValues - funkcija, kuri leidžia atnaujinti 'values' duomenis. ...values - kopijuoja visus likusius duomenis, kad jie neišnyktų. name: e.target.value - keičia 'name' duomenis į įvestus inpute duomenis */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={e => setValues({...values, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" name="gender" onChange={e => setValues({...values, gender: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="text" name="age" onChange={e => setValues({...values, age: e.target.value})} />
                    </div>
                    <button className='btn btn-success mt-3' type='submit'>Submit</button> {/* Patvirtiname įvestus duomenis ir patvirtinam, kad viskas gerai */}
                </form>
            </div>
        </div>
    )
};

export default Create; //Exportuojam Create funkciją, kad galėtume ja naudotis kituose fail'uose