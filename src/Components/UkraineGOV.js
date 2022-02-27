import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import ukraineGovLogo from '../UkraineGov.jpg';

import ethBalance from './Ethbalance.js';
import {usdt_address, usdt_abi} from '../USDT';



let Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/72e114745bbf4822b987489c119f858b"))

let numeral = require('numeral');


class UkraineGOV extends Component {

    constructor(props) {
        super(props);
        this.state = {

          ethBalance:0,
          tether:0,
          bloackNumber:0,
          dollarPerEth:0,
          dollarValue:0,
          usdtContract:[]
        }
    }
    

async loadBalance(){

    const blockNumber = await web3.eth.getBlockNumber();
    this.setState({blocks:blockNumber},()=>console.log());

    const balance = await web3.eth.getBalance("0x165CD37b4C644C2921454429E7F9358d18A45e14");
    const usdt = new web3.eth.Contract(usdt_abi, usdt_address);
    this.setState({ethBalance:web3.utils.fromWei(balance)},()=>console.log(this.state.ethBalance/1000000))

    this.setState({usdtContract:usdt});


    const usdtBal = await this.state.usdtContract.methods.balanceOf("0x165CD37b4C644C2921454429E7F9358d18A45e14").call();
    const usdtBalance = usdtBal;
 
    this.setState({tether:usdtBalance/1000000},()=>console.log('bab',this.state.tether))

    this.setState({dollarValue:this.state.dollarPerEth * this.state.ethBalance + this.state.tether},()=>console.log())
    
   

    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {    
                console.log('value',data.ethereum.usd)           
                this.setState({dollarPerEth: data.ethereum.usd},()=>console.log('this',this.state.dollarPerEth))
            }               
              )
              .catch(console.log)
              setInterval(()=>this.loadBalance(),5000)
}  



async getLogo(){

       fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false')
       .then(res => res.json())
       .then((data) => {
         
         this.setState({logo: data.image.small},()=>(console.log()))}
       )
       .catch(console.log)
   
     }



round(value){
    if (value){  
        return numeral(this.state.ethBalance).format('0,0.00000000');        
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

        let fontColor = 'rgb(154, 236, 87)';
        if(this.state.ethBalance < this.state.ethBalance){
            fontColor = 'rgb(98, 175, 34)';
        }
        else if(this.state.ethBalance > this.state.ethBalance){
            fontColor = 'rgba(230, 26, 60)';
        }
        else{
            fontColor = 'rgb(154, 236, 87)';
        }



        let fontColor2 = 'rgb(154, 236, 87)';
        if(this.state.dollarValue < this.state.dollarValue){
            fontColor2 = 'rgb(98, 175, 34)';
        }
        else if(this.state.dollarValue > this.state.dollarValue){
            fontColor2 = 'rgba(230, 26, 60)';
        }
        else{
            fontColor2 = 'rgb(154, 236, 87)';
        }


        let eth =<p>Ethereum Balance: <AnimatedNumber component="text" value={this.state.dollarValue} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}></AnimatedNumber> ETH</p>;

        
        let usdt = <p>USDT: $<AnimatedNumber component="text" value={this.state.dollarValue} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor2}
        )}
        duration={1500}
        formatValue={n=>this.roundUsdt(n)}></AnimatedNumber> </p>;
        
        
        
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
                <img className="daoLogo" src={ukraineGovLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Government of Ukraine</h3>
               
               </div>
               <div>Website: <a href="https://twitter.com/Ukraine/status/1497594592438497282" target ="blank">https://twitter.com/Ukraine</a></div>
               <h4>Ethereum Wallet: <a href="https://etherscan.io/address/0x165CD37b4C644C2921454429E7F9358d18A45e14" target ="blank">0x165CD37b4C644C2921454429E7F9358d18A45e14</a></h4>
               {eth}
               {usdt}
               {dollar}
               <div className="foot">
                <h4>The government of Ukraine is now accepting cryptocurrency donations. Bitcoin, Ethereum & USDT.</h4>
                </div>
            </div>
            
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.getDollarValue();
       // this.getLogo();
       
             
      }
    
}


export default UkraineGOV;