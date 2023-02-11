import React from "react";
//import { useState} from "react";

import "./marketPlace.css"

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";
import ticketAddress from "../contracts/ticket-address.json";
import TicketArtifact from "../contracts/ticketsDeploy.json";
import dataBaseAddress from "../contracts/dataBase-address.json";
import DataBaseArtifact from "../contracts/dataBase.json";
import MarketAddress from "../contracts/market-address.json";
import MarketArtifact from "../contracts/Market.json";

import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { Transfer } from "./Transfer";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";
import { ChoosePage } from "./ChoosePage";
import { Account } from "./Account";
import { Ticket } from "./Ticket";
import { PreviousPage } from "./PreviousPage";
import { Button } from "./Button";
import { AddProduct } from "./AddProduct";


const HARDHAT_NETWORK_ID = '80001';

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;


export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      tokenData: undefined,
      selectedAddress: undefined,
      balance: undefined,
      userName: "TEST NAME",
      giveBalance: undefined,
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      pageDisplay: undefined,
      accountType: undefined,
      isTokenAddressSet: undefined,
      ticketsArray: [],
      currentTicket: 0,
      products: []
    };

    this.state = this.initialState;
  }


  render() {
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    if (this.state.tokenData === undefined) {
      return <Loading />;
    }

    if(this.state.accountType === 3 && this.isTokenAddressSet === undefined)
    {
      //this._ticket.setTokenAddress(this._token.address)
      this.isTokenAddressSet = true
    }

    if(this.state.pageDisplay === undefined)
    {
      return <ChoosePage 
      register={() => this._register()}
      transfer={() => this._transfer()}
      ticket={() => this._addingTicket()}
      ticketAccept={() => this.ticketAccepting()}
      currentUser={this.state.accountType}
      market = {() => this.marketPlace()}
      />;
    }
    
    if( this.state.pageDisplay === "REGISTER")
    {
      return (
        <div>
              {(
                <PreviousPage 
                  prevPage={() => this._pageReset()}
                />
              )}
              
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}

            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
            )}
              {(
                <Account 
                  createAccount={(address, name, lastname, email, accountType) => this._addAccount(address, name, lastname, email, accountType)}
                  user={this.state.accountType}
                />
              )};
        </div>
      );
      

    }
    else if(this.state.pageDisplay === "TRANSFER")
    {
      return (
        <div>
              {(
                <PreviousPage 
                  prevPage={() => this._pageReset()}
                />
              )}
            <div className="container-info">
              <h1>
                {this.state.tokenData.name} ({this.state.tokenData.symbol})
              </h1>
              <h3> Contract address: <b>{this._ticket.address}</b> </h3>
              <p>
                Welcome {this.state.userName.toString()} <b>{this.state.selectedAddress}</b>, you have{" "} <b> {this.state.balance.toString()}</b>
              </p>
            </div>
            
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}

            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
            )}

            {this._token.balanceOf(this._ticket.address) === 0 && (
              <NoTokensMessage selectedAddress={this.state.selectedAddress} />
            )}

            {(
              <Transfer
                transferTokens={(to, amount) =>
                  this._transferTokens(to, amount)
                }
                tokenSymbol={this.state.tokenData.symbol}
              />
            )}
            </div>
    )
    }
    else if(this.state.pageDisplay === "TICKET")
    {
      return (
        <div>
              {(
                <PreviousPage 
                  prevPage={() => this._pageReset()}
                />
              )}
              
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}

            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
            )}
             {(
                <Ticket 
                addTicket={(shortInfo, email, nubmerToGain) => this._addTicket(shortInfo, email, nubmerToGain)}
                /> 
              )}
              
        </div>
      );

    }
    else if(this.state.pageDisplay === "TICKETACC")
    {
      this.giveAllTickets()
      if(this.state.ticketsArray !== undefined)
      {
        let i = 0;
        const hay = document.querySelector('.info-hay-value');
        const name = document.querySelector('.info-name-value');
        const reason = document.querySelector('.info-reason-value');
        const id = document.querySelector('.info-id-value');
        const isChosen = hay !== "" ? true : false;
        
        document.querySelectorAll('.raportA').forEach(div => {
          div.addEventListener('click', event => {
            i = event.target.dataset.index
            id.textContent = Number(event.target.dataset.index) + 1
            hay.textContent = this.state.ticketsArray[i].numberOfTokens;
            
            this._dataBase.getString(this.state.selectedAddress).then((result) => {
              name.textContent = result;
            }).catch((err) => {
              console.log(err)
            });
            
            reason.textContent = this.state.ticketsArray[i].explanation;
          });
        });


        const checked = document.querySelector('#reject:checked') !== null;


        return (
      <div>
        {(
          <PreviousPage 
            prevPage={() => this._pageReset()}
          />
        )}
              
        {this.state.txBeingSent && (
          <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
        )}

        {this.state.transactionError && (
          <TransactionErrorMessage
            message={this._getRpcErrorMessage(this.state.transactionError)}
            dismiss={() => this._dismissTransactionError()}
          />
        )}

      

        <div class="containerA">
          <div class="raportsA" >
              {this.state.ticketsArray.length > 0 &&(
                this.state.ticketsArray.map((struct, index) => {
                  return(
                    <div class="raportA" key={index} data-index={index} >Zgłoszenie {index + 1}</div>
                  )
                })
              )}
          </div>
          <div class="form-group">
            <div class="info">
                  <div class="info-id">
                      <b>Zgłoszenie: </b> <span class="info-id-value"> </span>
                  </div>
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
            <div class="Radio">
              <div>
                {this.state.ticketsArray.length > 0 &&(
                  <input type="checkbox" id="reject" name="reject" value="yes" />
                )}
                {this.state.ticketsArray.length > 0 &&(
                  <label for="reject">Reject</label>
                )}
                  
                  
              </div> 
            </div>
            <div class="form-data">
              <form
              onSubmit={(event) => {
                    
                event.preventDefault();

                const formData = new FormData(event.target);
                const explanation = formData.get("reason")
                const hay = document.querySelector('.info-hay-value');
                const name = document.querySelector('.info-name-value');
                const reason = document.querySelector('.info-reason-value');
                const id = document.querySelector('.info-id-value');

                if (explanation && hay && name && reason && id) {
                    this._acceptTicket(Number(id.textContent),!checked,explanation)
                }
                else if(!explanation)
                {
                  this._acceptTicket(Number(id.textContent) - 1,!checked, "")
                }
                console.log(Number(id.textContent) - 1);

                hay.textContent = ""
                id.textContent = ""
                reason.textContent = ""
                name.textContent = ""

            }}
            >
                  {isChosen && checked &&(
                    <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
                    
                  )}
                  {console.log()}
                  {isChosen && this.state.ticketsArray.length > 0 &&(
                    <div class="btns">
                        <button class="reject" type="submit">Submit</button>
                    </div>
                  )}
                  {/* {isChosen && !checked &&(
                    <div class="btns">
                        <button class="accpet" type="submit">Accept</button>
                    </div>
                  )} */}
              </form >
            </div>  
            </div>
          </div>
      </div>
      )
      }
    }
    else if(this.state.pageDisplay === "MARKET")
    {
      this.giveAllProducts();
      if(this.state.products !== undefined)
      {
        return(
          <div className="mainMarketPlace">
            {(
            <PreviousPage 
              prevPage={() => this._pageReset()}
            />
            )}
            <div className="buttons">
              <Button 
                something={() => this._addProduct()}
                text={"Dodaj produkt"}
              />
              <Button 
                something={() => this._editProduct()}
                text={"Edytuj produkty"}
              />
              <Button 
                something={() => this._addProduct()}
                text={"Usuń produkty"}
              />
            </div>
            
    
            <div className="mainMarketPlace">
              {this.state.products.length > 0 &&(
                this.state.products.map((struct, index) => {
                  if (index % 3 === 0) {
                    return (
                      <div className="boxBody" key={index} style={{ clear: 'both' }}>
                        <div className="box" key={index} data-index={index}>
                          <div className="boxTitle">{this.state.products[index].name}</div>
                          <div className="boxImage">
                              <img src="product.jpg" alt="product"/>
                          </div>
                          <div className="boxFooter">
                              <div className="boxDescription">{Number(struct.cost)} $TTPSC</div>
                              <button className="boxButton">Kup</button>
                          </div>
                        </div>
                        {this.state.products[index + 1] && (
                          <div
                            className="box"
                            key={index + 1}
                            data-index={index + 1}
                          >
                            <div className="boxTitle">{this.state.products[index + 1].name}</div>
                            <div className="boxImage">
                                <img src="product.jpg" alt="product"/>
                            </div>
                            <div className="boxFooter">
                                <div className="boxDescription">{Number(this.state.products[index + 1].cost)} $TTPSC</div>
                                <button className="boxButton">Kup teraz</button>
                            </div>
                          </div>
                        )}
                        {this.state.products[index + 2] && (
                          <div
                            className="box"
                            key={index + 2}
                            data-index={index + 2}
                          >
                            <div className="boxTitle">{this.state.products[index + 2].name}</div>
                            <div className="boxImage">
                                <img src="product.jpg" alt="product"/>
                            </div>
                            <div className="boxFooter">
                                <div className="boxDescription">{Number(this.state.products[index + 2].cost)} $TTPSC</div>
                                <button className="boxButton">Kup teraz</button>
                            </div>
                          </div>
                          
                        )}
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
            
          )
      }
      else
      {
        return(
          <div className="container">
            {(
              <PreviousPage 
                prevPage={() => this._pageReset()}
              />
            )}
            <Button 
              something={() => this._addProduct()}
              text={"Dodaj produkt"}
            />
            <p>Market jest pusty</p>
          </div>
        )
      }
      
      
    }
    else if(this.state.pageDisplay === "PRODUCT")
    {
      return(
        <div>
        {(
          <PreviousPage 
            prevPage={() => this.marketPlace()}
          />
        )}
          
        {this.state.txBeingSent && (
          <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
        )}

        {this.state.transactionError && (
          <TransactionErrorMessage
            message={this._getRpcErrorMessage(this.state.transactionError)}
            dismiss={() => this._dismissTransactionError()}
          />
        )}
        {(
          <AddProduct 
          addProduct={(name, cost, url) => this.addProduct(name, cost, url)}
          /> 
        )}
            
      </div>
      )
     
    }
    else if(this.state.pageDisplay === "EDITPRODUCT")
    {
      this.giveAllProducts();
      return(
        <div>
          {(
          <PreviousPage 
            prevPage={() => this.marketPlace()}
          />
          )}
          <div className="container">
            <div className="container-box">
              <form
              onSubmit={(event) => {
                    
                event.preventDefault();

                const formData = new FormData(event.target);
                const product = formData.get("product")
                console.log(product)
                console.log(this.state.products[product].name)
                const cost = formData.get("cost")

                if (product && cost) {
                    this.editProduct(this.state.products[product].name, cost)
                }

            }}>
                <div className="form-group" >
                  <label>Nazwa przedmiotu</label>
                  <select className="form-select" name="product" required >
                    {this.state.products.map((struct, index) => {
                      return(
                        <option value={index} >{struct.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-group">
                    <label>Nowa kwota</label>
                    <input className="form-control" type="number" name="cost" required />
                </div>
                <div className="form-group btn">
                    <input className="button" type="submit" value="Zmień"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
    

  componentWillUnmount() {
    this._stopPollingData();
  }

  async _connectWallet() {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
    });
    
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
    this._getString()
    this._getUserType()
    
  }

  _initialize(userAddress) {
   
    this.setState({
      selectedAddress: userAddress,
    });

    const balance = 0
    this.setState({balance})
    this._initializeEthers();
    this._getTokenData();
    

    this._getString()
    this._getUserType();
  }

  async _initializeEthers() {
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._token = new  ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );

    this._ticket = new ethers.Contract(
      ticketAddress.Ticket,
      TicketArtifact.abi,
      this._provider.getSigner(0)
    );

    this._dataBase = new ethers.Contract(
      dataBaseAddress.DataBase,
      DataBaseArtifact.abi,
      this._provider.getSigner(0)
    );

    this._market = new ethers.Contract(
      MarketAddress.Market,
      MarketArtifact.abi,
      this._provider.getSigner(0)
    );
  }

  _startPollingData() {
    if(!this.state.pageDisplay)
    {
      this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    this._updateBalance();
    this._giveBalance();
    }
    
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _updateBalance() {
    const balance = await this._token.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
  }

  async _giveBalance() {
    const giveBalance = await this._token.balanceOf(this._ticket.address);
    this.setState({ giveBalance });
  }

  async _register() {
    const pageDisplay = "REGISTER";
    this.setState({ pageDisplay });
  }

  _getUserType(){
    this._dataBase.getType().then((result) => {
      const accountType = result
      this.setState({accountType})
    }).catch((err) => {
      console.log(err)
    })
  }

  async _transfer() {
    const pageDisplay = "TRANSFER";
    this.setState({ pageDisplay });
    this._startPollingData();
  }
  async _addingTicket() {
    const pageDisplay = "TICKET";
    this.setState({ pageDisplay });
    this._startPollingData();
  }

  

  async ticketAccepting() {
    const pageDisplay = "TICKETACC";
    this.setState({ pageDisplay });
    this._startPollingData();
  }

  async marketPlace() {
    const pageDisplay = "MARKET";
    this.setState({ pageDisplay });
    this._startPollingData();
  }

  async _addProduct() {
    const pageDisplay = "PRODUCT";
    this.setState({ pageDisplay });
    this._startPollingData();
  }

  async _editProduct() {
    const pageDisplay = "EDITPRODUCT";
    this.setState({ pageDisplay });
    this._startPollingData();
  }

  async _pageReset(){
    const pageDisplay = undefined;
    this.setState({ pageDisplay });
    this._stopPollingData();
  }

  _getString() {
    this._dataBase.getString(this.state.selectedAddress).then((result) => {
      const userName = result;
      this.setState({ userName })
    }).catch((err) => {
      console.log(err)
    });
  }

  giveAllTickets() {
      this._ticket.getAllTickets().then((result) => {
        const ticketsArray = result;
        this.setState({ ticketsArray })
    }).catch((err) => {
      console.log(err)
    });
    
  }

  giveAllProducts()
  {
    this._market.getProducts().then((result) => {
      const products = result;
      this.setState({ products })
    }).catch((err) =>{
      console.log(err)
    })
  }

  async _addAccount(address, name, lastname, email, accountType)
  {
    try{
      this._dismissTransactionError();

      const tx = await this._dataBase.addPerson(address, name, lastname, email, accountType, {gasLimit: 540000});
      
      this.setState({ txBeingSent: tx.hash });
      
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    }
    catch(error)
    {
      console.error(error);
    }
    finally {
      this.setState({ txBeingSent: undefined });

    }
  }

  async _addTicket(shortInfo, email, nubmerToGain)
  {
    try{
      this._dismissTransactionError();

      const tx = await this._ticket.addTicket(shortInfo, this._dataBase.getAddressFromEmail(email), nubmerToGain, {gasLimit: 540000});
      
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    }
    catch(error)
    {
      console.error(error);
    }
    finally {
      this.setState({ txBeingSent: undefined });

    }
  }

  async addProduct(name, cost, url)
  {
    try{
      this._dismissTransactionError();

      const tx = await this._market.addProduct(name, cost, url, {gasLimit: 540000});
      
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    }
    catch(error)
    {
      console.error(error);
    }
    finally {
      this.setState({ txBeingSent: undefined });

    }
  }

  async editProduct(name, cost)
  {
    try{
      this._dismissTransactionError();

      const tx = await this._market.editProduct(name, cost, {gasLimit: 540000});
      
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    }
    catch(error)
    {
      console.error(error);
    }
    finally {
      this.setState({ txBeingSent: undefined });

    }
  }

  async _acceptTicket(ticketID, decision ,explanation)
  {
    try{
      this._dismissTransactionError();

      const tx = await this._ticket.approve(ticketID, decision,explanation, {gasLimit: 540000});
      
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    }
    catch(error)
    {
      console.error(error);
    }
    finally {
      this.setState({ txBeingSent: undefined });

    }
  }

  async _transferTokens(to, amount) {
  
    try{
      this._dismissTransactionError();

     
      const tx = await this._ticket.sendToken(to, parseInt(amount), {gasLimit: 169623});
    
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      await this._updateBalance();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {

      this.setState({ txBeingSent: undefined });
    }
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  _resetState() {
    this.setState(this.initialState);
  }

  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({ 
      networkError: 'Please connect Metamask to mumbai'
    });

    return false;
  }
}
