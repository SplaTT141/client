import React, {useEffect, useState} from "react"; //Importuojam React biblioteką, useState hook'ą, kuris leidžia klientui redaguoti kintamojo duomenis, useEffect hook'ą , kuris padaro tam tikrą veiksmą, kai tam tikras kompontentas užsikraus arba pasikeis. useEffect yra skirtas „šalutiniams efektams“, kurie nevyksta tiesiogiai renderio metu
import axios from 'axios'; //Importuojam axios biblioteką, kuri leidžia siųsti HTTP užklausas į serverį
import {Link, useParams} from 'react-router-dom'; //Link yra React'o '<a>' analogas, kuris leidžia naviguoti klientui tarp puslapių. useParams leidŽia gauti dinamiškus maršruto parametrus iš URL

function Read() { //Sukuriame funkciją
    const [data, setData] = useState([]); //Sukuriame masyvą, kuriame yra kintamasis 'data' (masyvas), kuriame bus saugomi studentų duomenys, o 'setData' leis redaguoti 'data' duomenys. Pradinė 'data' reikšmė yra '[]' (tusčias masyvas)
    const {id} = useParams(); //Naudojam, kad iš URL ištraukti dinaminius parametrus, šiuo atveju studento ID (numerį). Ištraukia iš URL tai kas yra po ":"
    useEffect(() => { //Naudojam useEffect hook'ą
        axios.get(`/get_student/${id}`) //Siunčiame serveriui GET užklausą į tam tikrą endpoint'ą (/get_studet/id), kuri grąžina studento duomenis JSON formatu
        .then ((res) => { //Jeigu viskas gerai:
            setData(res.data) //Pakeičiam tuščią 'data' į 'data' su duomenimis iš serverio
        })
        .catch((err) => console.log(err)) //Jeigu kyla klaida išvedam į console 
    }, [id]); //useEffect funkcija suveikia, kai pasikeičia 'id' 

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary p-4">
      <h1>User Details</h1>
      <Link to="/" className="btn btn-success mb-3"> {/* Sukuriame mygtuką, kurį paspaudus klientas grįš į pagrindinį puslapį */}
        Back
      </Link>

      {data.map((student) => ( //Sukuriame dinamiškai kuriama kontentą 'map' pagalba. t.y. iš studento duomenų masyvo išims prašomas reikšmes
        <ul className="list-group mb-3" key={student.id}>
          <li className="list-group-item">
            <b>ID: </b> {student["id"]} {/* Prašome iš 'student' duomenų masyvo ištraukti jo ID */}
          </li>
          <li className="list-group-item">
            <b>Name: </b> {student["name"]}
          </li>
          <li className="list-group-item">
            <b>Email: </b> {student["email"]}
          </li>
          <li className="list-group-item">
            <b>Age: </b> {student["age"]}
          </li>
          <li className="list-group-item">
            <b>Gender: </b> {student["gender"]}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Read; //Exportuojame 'Read' funkciją