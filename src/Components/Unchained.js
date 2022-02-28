import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import unchainLogo from '../unchained.jpg';

import * as nearAPI from "near-api-js";


let numeral = require('numeral');


class Unchained extends Component {

    constructor(props) {
        super(props);
        this.state = {

          nearBalance:0,
          wethBalance:0,
          bloackNumber:0,
          dollarPerNear:0,
          dollarValue:0,

          prevState:0,
          prevNear:0,
          prevUSDT:0,
        }
    }
    

async loadBalance(){
    this.setState({prevNear:this.state.nearBalance,prevState:this.state.dollarValue},()=>console.log)

    const { keyStores } = nearAPI;
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const { connect } = nearAPI;


const config = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  deps: {
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  },
};
const near = await connect(config);
const response = await near.connection.provider.query({
    request_type: "view_account",
    finality: "final",
    account_id: "unchain-fund.sputnik-dao.near",
  });
 this.setState({nearBalance:response.amount/1000000000000000000000000})
 this.setState({dollarValue:this.state.dollarPerNear * this.state.nearBalance})
    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {          
                this.setState({dollarPerNear: data.near.usd},()=>console.log())
            }               
              )
              .catch(console.log)
              setInterval(()=>this.loadBalance(),15000)
}  





round(value){
    if (value){  
        return numeral(this.state.nearBalance).format('0,0.0000');        
        }
        
    return 0;
    }


    roundDollar(value){
        if (value){  
            return numeral(this.state.dollarValue).format('0,0.');      
            }
            
        return 0;
        }

    
    render() {

        let fontColor = 'rgb(154, 236, 87)';
        if(this.state.prevNear < this.state.nearBalance && this.state.prevNear !== 0){
            fontColor = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevNear > this.state.nearBalance){
            fontColor = 'rgba(230, 26, 60)';
        }
        else{
            fontColor = 'rgb(240, 243, 237)';
        }



        let fontColor2 = 'rgb(154, 236, 87)';
        if(this.state.prevState < this.state.dollarValue && this.state.prevState !== 0){
            fontColor2 = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevState > this.state.dollarValue){
            fontColor2 = 'rgba(230, 26, 60)';
        }
        else{
            fontColor2 = 'rgb(240, 243, 237)';
        }


        let eth =<p>Near Balance: <AnimatedNumber component="text" value={this.state.nearBalance} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}></AnimatedNumber> NEAR</p>;

        
        
        let dollar = <p>Total Donated Value: $<AnimatedNumber component="text" value={this.state.dollarValue} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor2}
        )}
        duration={1500}
        formatValue={n=>this.roundDollar(n)}></AnimatedNumber> </p>;
    
      
      
      
        return (
            <div className='cards'>
                <div className="title">
                <img className="daoLogo" src={unchainLogo} border={1} alt="Unchained" ></img>

               <h3>Unchain</h3>
               
               </div>
               <div>Website: <a href="https://unchain.fund/" target ="blank">https://www.unchain.fund</a></div>
               <h4>Near Wallet: <a href="https://explorer.mainnet.near.org/accounts/unchain-fund.sputnik-dao.near" target ="blank">unchain-fund.sputnik-dao.near</a></h4>
               {eth}
            
               {dollar}

               <div className="foot">
                <h4>  Unchain is raising funds to support Ukrainian people via NGO's. The goal is to help Ukraine become the country it deserves to be: peaceful and free.</h4>
                </div>
            </div>
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.loadBalance();
        this.getDollarValue();
       // this.getInternal();
       
             
      }
    
}


export default Unchained;