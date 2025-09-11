import React, {useEffect, useState} from "react"; //Importuojam React biblioteką, useState hook'ą, kuris leidžia klientui redaguoti kintamojo duomenis, useEffect hook'ą , kuris padaro tam tikrą veiksmą, kai tam tikras kompontentas užsikraus arba pasikeis. useEffect yra skirtas „šalutiniams efektams“, kurie nevyksta tiesiogiai renderio metu
import axios from 'axios'; //Importuojam axios biblioteką, kuri leidžia siųsti HTTP užklausas į serverį
import {Link, useParams, useNavigate} from 'react-router-dom'; //Link yra React'o '<a>' analogas, kuris leidžia naviguoti klientui tarp puslapių. useParams leidŽia gauti dinamiškus maršruto parametrus iš URL. useNavigate, leidžia perkelti klientą i tam tikrą puslapį po tam tikrų veiksmų

function Edit() { //Sukuriame funkciją
    const [data, setData] = useState([]); //Sukuriame masyvą, kuriame yra kintamasis 'data' (masyvas), kuriame bus saugomi studentų duomenys, o 'setData' leis redaguoti 'data' duomenys. Pradinė 'data' reikšmė yra '[]' (tusčias masyvas)
    const {id} = useParams(); //Naudojam, kad iš URL ištraukti dinaminius parametrus, šiuo atveju studento ID (numerį). Ištraukia iš URL tai kas yra po ":"
    useEffect(() => { //Iškviečiame useEffect hook'o funkciją
        axios.get(`/get_student/${id}`) //Siunčiame serveriui GET užklausą į tam tikrą endpoint'ą (/get_studet/id), kuri grąžina studento duomenis JSON formatu
        .then ((res) => { //Jeigu užklausa sėkminga:
            setData(res.data) //Pakeičiam tuščią 'data' į 'data' su duomenimis iš serverio
        })
        .catch((err) => console.log(err)) ///Jeigu kyla klaida išvedam į console 
    }, [id]); //`useEffect funkcija vėl suveikia, kai pasikeičia 'id' 

    const navigate = useNavigate(); //Priskiriam kintamajm useNavigate hook'ą

    function handleSubmit(e) { //Sukuriame funkciją, kuri patvirtinus į formą įvestus duomenis perduoda juos į serverį
        e.preventDefault(); //Išjugiame formos default'inį elgesį, t.y. kai klientas patvirtina įvestus duomenis puslapis nera perkraunamas automatiškai

        axios.post(`/edit_user/${id}`, data[0]) //Siunčiam POST užklausą serveriui adresu '/edit_user/ID'. ID yra dinaminis. antras parametras yra data[0], tai duomenis, kuriuos siunčiu į serverį. [0] yra nurodyta, tam kad siųsti serveriui objektą, o ne masyva. Jei nusiųstum visą data, serveris gautų masyvą, ir req.body.name neveiktų.
        .then ((res) => { //Jeigu viskas gerai:
            navigate('/'); //Klientas yra nukeliamas į 'Home' puslapį 
            console.log(res.data); //Išveda atsakyma į naršyklės consolę (visas axios objektas. Reikia nurodyti res.data, kad gauti tik serverio gražintus duomenis)
        })
        .catch((err) => console.log(err)); //Jeigu iškyla klaida išvedame ją į console
    }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">Back</Link> {/* Mygtukas, kurį paspaudus klientas grįžta į 'Home' puslapį */}
      {
        data.map((student) => { //Dinamiškai kuriamas elementas su 'map' metodu.
            return (
                <form onSubmit={handleSubmit}> {/* Kai formos duomenys yra suvesti ir patvirtinti yra iškviečiama 'handleSubmit' funkcija */}
                    <div className="form-group my-3">
                        <label htmlFor="name">Name</label>
                        <input
                            value={student.name} // Nurodoma, kas yra rodoma input lauke, iki jo koregavimo. Šiuo atveju studento 'name'. 
                            type="text"
                            name="name"
                            required
                            onChange={(e) => //Paleidžiama funkcija kaskart, kai kažkas yra įrašoma į lauką 
                                setData([{...data[0], name: e.target.value}])  //setData pakeičia iki tol esamus 'data' duomenis. '...data[0]' padaroma kopija visų pirmo objekto laukų, be '...data[0] visi kiti duomenys (email, gender, age) dingtų'. 'name: e.target.value'- perrašomas name laukas nauja reikšme, kurią įrašė klientas
                            }
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="name">Email</label>
                        <input
                            value={student.email}
                            type="email"
                            name="email"
                            required
                            onChange={(e) =>
                                setData([{...data[0], email: e.target.value}])
                            }
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="name">Gender</label>
                        <input
                            value={student.gender}
                            type="text"
                            name="gender"
                            required
                            onChange={(e) =>
                                setData([{...data[0], gender: e.target.value}])
                            }
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="name">Age</label>
                        <input
                            value={student.age}
                            type="number"
                            name="age"
                            required
                            onChange={(e) =>
                                setData([{...data[0], age: e.target.value}])
                            }
                        />
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button> {/* Mygtukas, kurį paspaudus yra patvirtiname formoje įvesti duomenys */}
                    </div>
                </form>
            )
        })
      }
    </div>
  );
}

export default Edit; //Exportuojame 'Edit' funkciją
