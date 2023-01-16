import React from "react";


export function ChoosePage({ register, transfer, ticket, ticketAccept,currentUser }) {
  return (
    <div>
        <div className="form-group">
          <input className="btn btn-primary" type="button" value="Ticket" onClick={ticket} />
        </div>
        <div className="form-group">
          <input className="btn btn-warning" type="button" value="Registration" onClick={register} />
        </div>
        { currentUser === 3 && (
          <div className="form-group">
          <input className="btn btn-warning" type="button" value="Transfer" onClick={transfer} />
        </div>
        )}
        { (currentUser >= 1)&& (
          <div className="form-group">
          <input className="btn btn-primary" type="button" value="Ticket acceptance" onClick={ticketAccept} />
        </div>
        )}
        
    </div>
  );
}


