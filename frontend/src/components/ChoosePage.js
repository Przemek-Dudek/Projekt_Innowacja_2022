import React from "react";

export function ChoosePage({ register, transfer }) {
  return (
    <div>
        <div className="form-group">
          <input className="btn btn-primary" type="button" value="Transfer" onClick={transfer} />
        </div>
        <div className="form-group">
          <input className="btn btn-warning" type="button" value="Registration" onClick={register} />
        </div>
    </div>
  );
}


