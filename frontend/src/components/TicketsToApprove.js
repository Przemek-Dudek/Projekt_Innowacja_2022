import React from "react";

export function TicketsToApprove({lala}) {
    return (
        <div class="container">
        <div class="raports">
            <div class="raport">zgloszenie 1</div>
            <div class="raport">zgloszenie 2</div>
            <div class="raport">zgloszenie 3</div>
        </div>
        <div class="form-group">
            <div class="info">
                <div class="info-hay">
                    <b>Siano: </b> <span class="info-hay-value"></span>
                </div>
                <div class="info-name">
                    <b>Imie i nazwisko: </b> <span class="info-name-value"></span>
                </div>
                <div class="info-reason">
                    <b>Uzasadnienie: </b> <span class="info-reason-value"></span>
                </div>
            </div>
            <div class="form-data">
                <form action="">
                    <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
                    <div class="btns">
                        <button class="approve">Approve</button>
                        <button class="reject">Reject</button>
                    </div>
                </form>
            </div>  
        </div>
    </div>
    )
}
