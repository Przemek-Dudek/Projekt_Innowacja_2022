import React from "react";
import "./Button.css"

export function Button({something}) {
  return (        
  <input className="btn btn-product" type="button" value="Dodaj produkt" onClick={something} />
  );
}


