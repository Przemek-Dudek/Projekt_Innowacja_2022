import { useEffect, useRef, React} from "react";
import "../index.css";
export function TicketsToApprove({tickets}) {

    let isChecked = false
    function handleChange(e) {
        isChecked = true;
        // do whatever you want with isChecked value
      }
    // const ticket = [
    //     {
    //         explanation: "abc2",
    //         address: 0x1234567890,
    //         numberOfTokens: 3,
    //         approved: undefined,
    //         explanationIfNot: undefined,
    //         Id: 0
    //     },
    //     {
    //         explanation: "abc",
    //         address: 0x0987654321,
    //         numberOfTokens: 7,
    //         approved: undefined,
    //         explanationIfNot: undefined,
    //         Id: 1
    //     },
    //     {
    //         explanation: "ta",
    //         address: 0x1029384756,
    //         numberOfTokens: 1,
    //         approved: undefined,
    //         explanationIfNot: undefined,
    //         Id: 2
    //     }
    // ];
    
    // const data = [
    //     {
    //         name: "Jan Kowalski"
    //     },
    //     {
    //         name: "Shavo Odadjian"
    //     },
    //     {
    //         name: "Denzel Curry"
    //     }
    // ]
    
    // const approveButton = document.querySelector('.approve');
    // const rejectButton = document.querySelector('.reject');

    // for (let i = 0; i < ticket.length; i++) {
    //     const raport = document.createElement('div');
    //     raport.className = 'raport';
    //     raport.textContent = "Zgłoszenie " + (i + 1);
    //     document.querySelector('.raports').appendChild(raport);

    //     raport.addEventListener('click', (element) => {
    //         const hay = document.querySelector('.info-hay-value');
    //         const name = document.querySelector('.info-name-value');
    //         const reason = document.querySelector('.info-reason-value');

    //         hay.textContent = ticket[i].numberOfTokens;
    //         name.textContent = data[i].name;
    //         reason.textContent = ticket[i].explanation;
    //     }, false);
    // }
    

    return (
        <div class="container">
        <div class="raports">
            <div class="raport">zgloszenie 1</div>
            <div class="raport">zgloszenie 2</div>
            <div class="raport">zgloszenie 3</div>
            <div class="raport">zgloszenie 3</div>
            <div class="raport">zgloszenie 3</div>
        </div>
        <div class="form-group">
            <div class="info">
                <div class="info-hay">
                    <b>Kwota: </b> <span class="info-hay-value"></span>
                </div>
                <div class="info-name">
                    <b>Imie i nazwisko: </b> <span class="info-name-value"></span>
                </div>
                <div class="info-reason">
                    <b>Uzasadnienie: </b> <span class="info-reason-value"></span>
                </div>
            </div>
            <div class="Radio">
                    
                <div>
                    <input type="checkbox" id="reject" name="reject" value="yes" onClick={
                        //  {
                        //     if(isChecked){
                        //         isChecked = false
                        //     }
                        //     else{
                        //         isChecked = true
                        //     }
                            isChecked ? isChecked = false : isChecked = true

                        
                        } />
                    
                    <label for="reject">Reject</label>
                </div>
                    
            </div>
            <div class="form-data">
                {/* {isChecked &&( */}
                <form action="">
                    <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
                    <div class="btns">
                        
                        {/* {isChecked &&( */}
                            <button class="reject">Reject</button>
                        
                    </div>
                </form >
                {/* {!isChecked &&( */}
                <button class="approve">Approve</button>
            </div>  
        </div>
    </div>
    )
}
