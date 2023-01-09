import React from "react";

export function PreviousPage({prevPage}) {
    return (
        <div>
            <div className="form-group">
                <input className="btn btn-primary" type="button" value="Powrót" onClick={prevPage} />
            </div>
        </div>
    )
}