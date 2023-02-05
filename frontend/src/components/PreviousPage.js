import React from "react";
import "./PreviousPage.css"

export function PreviousPage({prevPage}) {
    return (
        <div>
            <div className="prev-button">
                <div value="Powrót" onClick={prevPage} >
                    <p>back</p>
                </div>
            </div>
        </div>
    )
}