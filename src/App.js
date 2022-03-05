import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';

import UkraineDAO from './Components/UkraineDAO';
import Unchained from './Components/Unchained';
import Reli3f from './Components/Relief';
import Binance from './Components/Binance';

import UkraineGOV from './Components/UkraineGOV';
import UkraineGOV_BTC from './Components/UkraineGOV_BTC';

import banner from './banner.png'




let Web3 = require('web3');
let numeral = require('numeral');

let x = 0;
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        total:0,

        ethGov:0,
        btcGov:0,
        Dao:0,
        Unchain:0,
        relief:0,
        binance:0,
      

      


        loading:true,
         
      }
    }


      

   dollarEth =(data)=>{
    if(data !== this.state.ethGov){
    this.setState({ethGov:data},()=>console.log());
    } 
  } 
  
   dollarBtc =(data)=>{
    if(data !== this.state.btcGov){
    this.setState({btcGov:data},()=>console.log());
    }
  } 



   dollarDao =(data)=>{
    this.setState({Dao:data.dollarValue},()=>console.log());
     
   } 

   dollarUnchain =(data)=>{
    this.setState({Unchain:data.dollarValue},()=>console.log());
   
  } 

   dollarRelief =(data)=>{
    this.setState({relief:data.dollarValue});
    
   } 

   dollarBinance =(data)=>{
    this.setState({binance:data.dollarValue});
    
   } 


   
  
  
    render(){
      /*<div className="column">
      <UkraineGOV onChange={this.dollarEth}/>
      </div>
      
      <div className="column">
      <UkraineGOV_BTC onChange={this.dollarBtc}/></div>   */
      
     

  return (
    <div className="App">
      <Navbar/>
      
       <header className="App-header">
   
   
    

        <div className="body">
        <div className="row">
        
           <div className="banner">
           <h3 className="cardText">Total Donation: ${numeral(this.state.Dao + this.state.Unchain + this.state.relief + this.state.binance + this.state.ethGov + this.state.btcGov ).format('0,0.00')}</h3>
        
         </div>

        <div className="column">
        <UkraineGOV onChange={this.dollarEth}/>
        </div>
      
        <div className="column">
        <UkraineGOV_BTC onChange={this.dollarBtc}/></div>
         
        <div className="column">
        <UkraineDAO onChange={this.dollarDao}/>
        </div>   

        <div className="column">
        <Unchained onChange={this.dollarUnchain}/>
        </div>   

        <div className="column">
        <Reli3f onChange={this.dollarRelief}/>
        </div>  

         <div className="column">
        <Binance onChange={this.dollarBinance}/>
        </div>    



        <div>
         </div>
         </div>
         
             
         

         </div>
     </header>
     
         <p className='footer'>This site is for tracking purposes only, we are not affiliated with any organization or party shown in this site.</p>

    </div>
    
  );
}

componentDidMount() {
  this._isMounted = true; 
 // this.loadToken();
}


/*shouldComponentUpdate(nextState) {
  console.log(nextState)
  console.log(this.state)
  if (this.state === this.state) {
    return true;
  } else {
    return false;
  }
}*/

/*componentDidUpdate(prevProps, prevState) {
  console.log(prevState)
  if (prevState.Dao !== this.state.Dao) {
    console.log('pokemons state has changed.')
  }
}*/



}


export default App;