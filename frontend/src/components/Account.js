import React from "react";

export function Account({createAccount}) {
    return (
        <div>
            <h3>Set up an account</h3>
            <form>
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
                <input className="form-control" type="email" name="e-mail" required />
            </div>
            <div className="form-group">
                <label>Account type</label>
                <input className="form-control" type="email" name="typeAccount" required />
            </div>
            <div className="form-group">
                <input className="btn btn-primary" type="submit" value="Register" />
            </div>
            </form>
        </div>
    )
}