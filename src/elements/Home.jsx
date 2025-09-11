import React, {useEffect, useState} from "react"; //Importuojam React biblioteką, useState hook'ą, kuris leidžia klientui redaguoti kintamojo duomenis, useEffect hook'ą , kuris padaro tam tikrą veiksmą, kai tam tikras kompontentas užsikraus arba pasikeis. useEffect yra skirtas „šalutiniams efektams“, kurie nevyksta tiesiogiai renderio metu
import axios from 'axios'; //Importuojam axios biblioteką, kuri leidžia siųsti HTTP užklausas į serverį
import {Link, useNavigate} from 'react-router-dom'; //Link yra React'o '<a>' analogas, kuris leidžia naviguoti klientui tarp puslapių.

function Home() { //Sukuriama funkcija
    const [data, setData] = useState([]); //Sukuriame masyvą, kuriame yra kintamasis 'data' (masyvas), kuriame bus saugomi studentų duomenys, o 'setData' leis redaguoti 'data' duomenys. Pradinė 'data' reikšmė yra '[]' (tusčias masyvas)
    useEffect(() => { //Naudoma useEffect hook'ą
        axios.get('/students') //Siunčiame užklausą į serverį, kad gautume studentų sąrašą su duomenimis
        .then ((res) => { //Jeigu užklausa sėkminga:
            setData(res.data) //Prisikiriame 'data' kintamajam gautus studentų sąrašą ir duomenis
        })
        .catch((err) => console.log(err)) //Jeigu siunčiant užklausą įvyks klaida, ji bus atvaizduota console'je
    }, []); //Nurodome, kad ankstesnė logika būtų vykdoma vieną kartą, kai komponentas yra užkraunamas (dėl tusčio [])

    function handleClickDelete(id) {
        axios.delete(`/delete_user/${id}`)
        .then (() => {
            axios.get('/students')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    return ( //Nurodome, kas bus atvaizduojama klientui 'Home' puslapyje
        <div className="container-fluid bg-primary vh-100 vw-100">
            <h3>Students</h3>
            <div className="d-flex justify-content-end">
                <Link className="btn btn-success" to='/create'>Add student</Link> {/* Sukuriame mygtuką, kurį paspaudęs klientas bus perkeliamas į "create" puslapį */}
            </div> 
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student) => { /* Kreipiames į 'data' masyvą, kad gauti reikiamus duomenis. Dinamiškai generuoja lentelės eilutes pagal studentų sąraš */
                            return (
                                <tr>
                                    <td>{student.id}</td> {/* Pagal rakta gauname reikiamus studento duomenis, šiuo atveju studento 'id' */}
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>{student.gender}</td>
                                    <td>
                                        <Link className="btn btn-success" to={`/read/${student.id}`}>Read</Link> {/* Kiekvienam studentui priskiriame 'read' mygtuką, kurį paspaudus bus galima perskaityti būtent pasirinkti studento duomenis */}
                                        <Link className="btn btn-success" to={`/edit/${student.id}`}>Edit</Link> {/* Kiekvienam studentui priskiriame 'edit' mygtuką, kurį paspaudus bus galima redaguoti pasirinkto studento duomenis */}
                                        <button onClick={() => handleClickDelete(student.id)} className="btn btn-danger">Delete</button> {/* Kiekvienam studentui priskiriame 'delete' mygtuką, kurį paspaudus bus galima ištrinti pasirinkto studento duomenis */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Home; //Exportuojame 'Home' funkciją