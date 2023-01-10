import React from "react";

export function Account({createAccount}) {
    return (
        <div>
            <h3>Set up an account</h3>
            <form
              onSubmit={(event) => {
                
                event.preventDefault();

                const formData = new FormData(event.target);
                const address = formData.get("address")
                const name = formData.get("name")
                const lastName = formData.get("lastName")
                const email = formData.get("email")
                const accountType = formData.get("typeAccount")

                if (address && name && lastName && email && accountType) {
                    createAccount(address, name, lastName, email, accountType)
                  }

              }}
            >
            <div className="form-group">
                <label>Address</label>
                <input className="form-control" type="text" name="address" required/>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" type="text" name="name" required />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input className="form-control" type="text" name="lastName" required />
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input className="form-control" type="email" name="email" required />
            </div>
            <div className="form-group">
                <label>Account type</label>
                <select className="form-select" name="typeAccount" required >
                    <option value="1">PRACOWNIK</option>
                    <option value="2">HR</option>
                    <option value="3">ADMIN</option>
                    <option value="4">HEAD_ADMIN</option>
                    
                    
                </select>
            </div>
            <div className="form-group">
                <input className="btn btn-primary" type="button" value="Register" />
            </div>
            </form>
        </div>
    )
}