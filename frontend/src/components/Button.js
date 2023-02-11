import React from "react";
import "./Button.css"

export function Button({something, text}) {
  return (        
  <input className="btn btn-product" type="button" value={text} onClick={something} />
  );
}


