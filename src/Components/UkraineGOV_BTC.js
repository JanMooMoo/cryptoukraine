import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import ukraineGovLogo from '../UkraineGov.jpg';

import {usdt_address, usdt_abi} from '../USDT';



let Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fdcf7b76a5e04f598a89724994743046"))

let numeral = require('numeral');


class UkraineGOV_BTC extends Component {

    constructor(props) {
        super(props);
        this.state = {

          btcBalance:0,
          tether:0,
          blockNumber:0,
          dollarPerbtc:0,
          dollarValue:0,
          

          txUSDT:[],
          spentBTC:0,
          totalBTC:0,
          totalDonation:0,


          prevState:0,
          prevBtc:0,
          prevUSDT:0,
          
        }
    }
    

async loadBalance(){
    this.setState({prevBtc:this.state.btcBalance,prevUSDT:this.state.tether,prevState:this.state.dollarValue},()=>console.log)

    fetch('https://api.blockcypher.com/v1/btc/main/addrs/357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P/balance?token=37487b0d2f00402caa6165ceac46d0f8')
    .then(res => res.json())
    .then((data) => {
            //console.log(data)

      this.setState({btcBalance:data.balance/100000000, spentBTC:data.total_sent/100000000,totalBTC:data.total_received/100000000}) 
      this.setState({dollarValue:this.state.dollarPerbtc * this.state.btcBalance})
      this.setState({totalDonation:parseInt(this.state.dollarPerbtc) * parseInt(this.state.totalBTC)},()=>console.log()) 
        this.handleBtc();
    }
    
      )
    .catch(console.log)
   // if(this.state.totalDonation!== 0){
    this.setState({dollarValue:this.state.dollarPerbtc * this.state.btcBalance})
    this.setState({totalDonation:parseInt(this.state.dollarPerbtc) * parseInt(this.state.totalBTC)},()=>console.log()) 
    this.handleBtc();
   // }
}


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {               
                this.setState({dollarPerbtc: data.bitcoin.usd},()=>console.log())
               
            }               
              )
              .catch(console.log)
              setInterval(()=>this.loadBalance(),60000)

}  

fetch(){
}


handleBtc = e => {
    // if (this.props.onChange) {
        this.props.onChange(this.state);
               
    };




round(value){
    if (value){  
        return numeral(this.state.btcBalance).format('0,0.0000');        
        }
        
    return 0;
    }


roundDollar(value){
        if (value){  
            return numeral(this.state.dollarValue).format('0,0.');      
            }
            
        return 0;
        }

roundUsdt(value){
    if (value){  
         return numeral(this.state.tether).format('0,0.');      
         }
                
    return 0;
    }
    

    
    render() {

        let fontColor = 'rgb(240, 243, 237)';
        if(this.state.prevBtc < this.state.btcBalance && this.state.prevBtc !== 0){
            fontColor = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevBtc > this.state.btcBalance){
            fontColor = 'rgba(230, 26, 60)';
        }
        else{
            fontColor = 'rgb(240, 243, 237)';
        }



        let fontColor2 = 'rgb(240, 243, 237)';
        if(this.state.prevState < this.state.dollarValue && this.state.prevBtc !== 0){
            fontColor2 = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevState > this.state.dollarValue){
            fontColor2 = 'rgba(230, 26, 60)';
        }
        else{
            fontColor2 = 'rgb(240, 243, 237)';
        }



        let fontColor3 = 'rgb(154, 236, 87)';
        if(this.state.prevUSDT < this.state.tether){
            fontColor3 = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevUSDT > this.state.tether){
            fontColor3 = 'rgba(230, 26, 60)';
        }
        else{
            fontColor3 = 'rgb(240, 243, 237)';
        }



        let btc =<p>Bitcoin Balance: <AnimatedNumber component="text" value={this.state.btcBalance} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}></AnimatedNumber> BTC</p>;

        
        let usdt = <p>USDT: $<AnimatedNumber component="text" value={this.state.dollarValue} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor3}
        )}
        duration={1500}
        formatValue={n=>this.roundUsdt(n)}></AnimatedNumber> </p>;
        
        
        
        let dollar = <p>Current Donation Value: $<AnimatedNumber component="text" value={this.state.dollarValue} style={{
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


        let links= <div><a href="https://www.blockchain.com/btc/address/357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P" target ="blank"> Moved:  {numeral(this.state.spentBTC).format('0,0.0000')} BTC</a>
              <div> <a href="https://www.blockchain.com/btc/address/357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P"target ="blank">Total Donated Value: ${numeral(this.state.totalDonation).format('0,0.')}</a></div></div>;

    
  
      
        return (
            <div className='cards'>
                <div className="title">
                <img className="daoLogo" src={ukraineGovLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Government of Ukraine</h3>
               
               </div>
               <div>Website: <a href="https://twitter.com/Ukraine/status/1497594592438497282" target ="blank">https://twitter.com/Ukraine</a></div>
               <h4>Bitcoin Wallet: <a href="https://www.blockchain.com/btc/address/357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P" target ="blank">357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P</a></h4>
               {btc}
               {dollar}
               {links}
              

               <div className="foot">
                <h4>The government of Ukraine is now accepting cryptocurrency donations. Bitcoin, Ethereum & USDT.</h4>
                </div>
            </div>
            
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.getDollarValue();
        this.loadBalance();      
       // this.getLogo();
                  
      }
    
}


export default UkraineGOV_BTC;