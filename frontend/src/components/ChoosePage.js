import React from "react";
import "./ChoosePage.css"

export function ChoosePage({ register, transfer, ticket, ticketAccept,currentUser }) {
  return (
    <div className="container">
      <div className="container-choose-box">
      <div className="form-group">
          <input className="btn btn-primary" type="button" value="Ticket" onClick={ticket} />
        </div>
        <div className="form-group">
          <input className="btn btn-warning" type="button" value="Register" onClick={register} />
        </div>
          { currentUser === 3 && (
            <div className="form-group">
            <input className="btn btn-warning" type="button" value="Transfer" onClick={transfer} />
          </div>
          )}
          { (currentUser >= 1)&& (
          <div className="form-group">
          <input className="btn btn-primary" type="button" value="Acceptance" onClick={ticketAccept} />
        </div>
        )}
      </div>      
    </div>
  );
}


