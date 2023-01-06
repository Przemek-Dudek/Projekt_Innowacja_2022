import React from "react";

export function Ticket({addTicket}) {
    return (
        <div>
            <h3>Dodane ticketu</h3>
            <form
              onSubmit={(event) => {
                
                event.preventDefault();

                const formData = new FormData(event.target);
                const email = formData.get("email")
                const amount = formData.get("amount")
                const explanation = formData.get("explanation")

                if (email && amount && explanation) {
                    addTicket(explanation, email, amount)
                }

              }}
            >
            <div className="form-group">
                <label>Kogo zgłaszasz (email)</label>
                <input className="form-control" type="email" name="email" required />
            </div>
            <div className="form-group">
                <label>Kwota</label>
                <input className="form-control" type="number" name="amount" required />
            </div>
            <div className="form-group">
                <label>Uzasadnienie</label>
                <input className="form-control" type="text" name="explanation" required />
            </div>
            
            <div className="form-group">
                <input className="btn btn-primary" type="submit" value="addTicket" />
            </div>
            </form>
        </div>
    )
}