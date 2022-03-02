import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import UkraineDAO from './Components/UkraineDAO';
import Unchained from './Components/Unchained';

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
      

      


        loading:true,
         
      }
    }


      

   dollarDao =(data)=>{
    this.setState({Dao:data.dollarValue},()=>console.log());
    
   } 

   dollarUnchain =(data)=>{
    this.setState({Unchain:data.dollarValue},()=>console.log());
    
   } 


   dollarEth =(data)=>{
    this.setState({ethGov:data.totalDonation},()=>console.log());
    
   } 

   dollarBtc =(data)=>{
    this.setState({btcGov:data.totalDonation},()=>console.log());
    
   } 

   
  
    render(){
     

  return (
    <div className="App">
      <Navbar/>
      
       <header className="App-header">
   
    

        <div className="body">
        <div className="row">

        
           <div className="banner">
           <h3 className="cardText">Total Donation: ${numeral(this.state.Dao + this.state.Unchain + this.state.ethGov + this.state.btcGov).format('0,0.00')}</h3>
        
         </div>
         
   
        
        <div className="column">
        <UkraineGOV onChange={this.dollarEth}/>
        </div>
        
        <div className="column">
        <UkraineGOV_BTC onChange={this.dollarBtc}/></div>   
        
        <div className="column">
        <UkraineDAO onChange={this.dollarDao}/></div>   

        <div className="column">
        <Unchained onChange={this.dollarUnchain}/></div>   



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

componentDidUpdate() {
  if (x !== 0) {
    console.log('shite')
  }
}



}


export default App;