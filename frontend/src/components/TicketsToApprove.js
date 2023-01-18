import { useState, useEffect, useRef, React, useMemo} from "react";
import "../index.css";
export function TicketsToApprove({tickets}) {

    let isChecked = false
    function handleChange(e) {
        isChecked = true;
        // do whatever you want with isChecked value
      }
   
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

      
    // let rapports = useRef(null)
    // useEffect(() => {
    //         for (let i = 0; i < tickets.length; i++) {
    //             const raport = document.createElement('div');
    //             raport.className = 'raport';
    //             raport.textContent = "Zgłoszenie " + (i + 1);
    //             rapports.current.appendChild(raport);

    //             return () => rapports.current.removeChild(rapports.current.children.lastChld);
        
    //             // raport.addEventListener('click', (element) => {
    //             //     const hay = document.querySelector('.info-hay-value');
    //             //     const name = document.querySelector('.info-name-value');
    //             //     const reason = document.querySelector('.info-reason-value');
        
    //             //     hay.textContent = tickets[i].numberOfTokens;
    //             //     name.textContent = data[i].name;
    //             //     reason.textContent = tickets[i].explanation;
    //             // }, false);
    //         }
    // }, [])
    



    // let rapportsRef = useRef([]);

    // const rapports = useMemo(() => {
    // const rapports = []
    // for (let i = 0; i < tickets.length; i++) {
    //     const raport = document.createElement('div');
    //     raport.className = 'raport';
    //     raport.textContent = "Zgłoszenie " + (i + 1);
    //     rapports.push(raport);
    // }
    // rapportsRef.current = rapports;
    // return rapports;
    // }, [tickets])


    // useEffect(() => {
    //     for (let i = 0; i < rapportsRef.current.length; i++) {
    //         rapports.current.appendChild(rapportsRef.current[i]);
    //     }
    // }, [rapportsRef]);

    const [arr,setArr] = useState([tickets]);
    console.log(arr);

    return (
        <div class="container">
        <div class="raports" >
            {
                arr.map((val, i) =>
                    <h3 key="i">{val}</h3>
                )
            }
            {/* <div class="raport">zgloszenie 1</div>
            <div class="raport">zgloszenie 2</div>
            <div class="raport">zgloszenie 3</div>
            <div class="raport">zgloszenie 3</div>
            <div class="raport">zgloszenie 3</div> */}
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
