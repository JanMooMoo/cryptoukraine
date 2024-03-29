import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';

import Bargraph from './Components/Bargraph';

import UkraineDAO from './Components/UkraineDAO';
import Unchained from './Components/Unchained';
import Reli3f from './Components/Relief';
import Binance from './Components/Binance';
import Aidforukraine from './Components/Aidforukraine';
import Gitcoin from './Components/Gitcoin';

import UkraineGOV from './Components/UkraineGOV';
import UkraineGOV_BTC from './Components/UkraineGOV_BTC';



let numeral = require('numeral');

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
        aid:0,

        dao_eth:0,
        relief_eth:0,
        binance_bnb:0,
        binance_usd:0,
        dollar_BNB:0,

        viewGraph:false,
        doughnut:true,
         
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
     //console.log(data)
    this.setState({Dao:data},()=>console.log());
     
   } 

   dollarUnchain =(data)=>{
    this.setState({Unchain:data},()=>console.log());
   
  } 

   dollarRelief =(data)=>{
    // console.log(data)
    this.setState({relief:data});
    
   } 

   dollarBinance =(data)=>{
    this.setState({binance:data});
    
   } 

   dollarAid =(data)=>{
    this.setState({aid:data});
    
   } 


  

   handleButton =()=>{
    if(this.state.ethGov.totalDonation !== undefined || this.state.ethGov.totalDonation === 0){
    setTimeout(()=>this.setState((prevState)=>{
      return {viewGraph: !prevState.viewGraph};
    }),600);
    }
   };

   handleChart =()=>{
    // if(this.state.ethGov.totalDonation !== undefined || this.state.ethGov.totalDonation === 0){
    setTimeout(()=>this.setState((prevState)=>{
      return {doughnut: !prevState.doughnut};
    }),200);
  //  }
   };
  
  
    render(){
      
      /*
      <div className="column">
      <UkraineGOV onChange={this.dollarEth}/>
      </div>
      
      <div className="column">
      <UkraineGOV_BTC onChange={this.dollarBtc}/>
      </div>   
      
      */
     
     let body = '';
     let buttonText = '';
     let button = '';
     let chartStyle = '';

     if(this.state.viewGraph){
       body =  <Bargraph dao={this.state.Dao} unchain={this.state.Unchain} relief={this.state.relief} binance={this.state.binance} bitcoin={this.state.btcGov} ethereum={this.state.ethGov} aid={this.state.aid} doughnut={this.state.doughnut}/>
       buttonText = 'View Donations'; 
      
       if(this.state.doughnut){
       chartStyle =  'View Bar Chart';
       }
       else{
        chartStyle =  'View Doughnut Chart';
       }
     }

     else{
      body = <div>

      <div className="column">
      <UkraineGOV onChange={this.dollarEth}/>
      </div>
      
      <div className="column">
      <UkraineGOV_BTC onChange={this.dollarBtc}/>
      </div>   

    
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

      <div className="column">
      <Aidforukraine onChange={this.dollarAid}/>
      </div> 

      <div className="column">
      <Gitcoin />
      </div> 

       
       
      </div>  

      buttonText = 'View Chart';
     }

     if(this.state.Dao.dollarValue !== undefined){
   //  if(this.state.ethGov.totalDonation !== undefined){
       button = <div>
      <button onClick={this.handleButton} className="viewButton">{buttonText}</button> {this.state.viewGraph && <button onClick={this.handleChart} className="viewButton">{chartStyle}</button>}
       </div>
     }

     //console.log(numeral(this.state.Dao.dollarValue + this.state.Unchain.dollarValue + this.state.relief.dollarValue + this.state.binance.dollarValue + this.state.ethGov.totalDonation + this.state.btcGov.totalDonation ).format('0,0.00'))
      

  return (
    <div className="App">
      <Navbar/>
      
       <header className="App-header">
   
        <div className="body">
        <div className="row">
        <div className="banner">
           <h3 className="cardText">Total Donation: ${numeral(this.state.Dao.dollarValue + this.state.Unchain.dollarValue + 9311831 + this.state.relief.dollarValue + this.state.binance.dollarValue + this.state.btcGov.totalDonation + this.state.ethGov.totalDonation + this.state.aid.totalDonation  ).format('0,0.00')}</h3>
        
         </div>
        
         {button}
        {body}
        
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