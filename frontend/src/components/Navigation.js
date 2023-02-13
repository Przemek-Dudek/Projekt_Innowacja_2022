import {React} from "react";

import "./Navigation.css"

export function Navigation({ mainPage, myProducts, myTickets, myProfile }) {
    // function myFunction() {
    //     var x = document.getElementById("myTopnav");
    //     if (x.className === "topnav") {
    //     x.className += " responsive";
    //     } else {
    //     x.className = "topnav";
    //     }
    // }
       return (
        <nav className="userNav">
            <input className="btn linkToPage" type="button" value="Strona główna" onClick={mainPage} />
            <input className="btn linkToPage" type="button" value="Moje produkty" onClick={myProducts} />
            <input className="btn linkToPage" type="button" value="Moje zgłoszenia" onClick={myTickets} />
            <input className="btn linkToPage" type="button"value="Mój profil" onClick={myProfile} />
        </nav>
    )
}