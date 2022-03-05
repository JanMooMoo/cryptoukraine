import { transactions } from 'near-api-js';
import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import ukraineGovLogo from '../UkraineGov.jpg';

import {usdt_address, usdt_abi} from '../USDT';



let Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/80d02cdecda5428590656c7e420c7cba"))
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fdcf7b76a5e04f598a89724994743046"))

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
          usdtContract:[],

          txUSDT:[],
          spentUSDT:0,
          spentEth:0,
          totalEth:0,

          totalDonation:0,

          prevTotal:0,
          prevState:0,
          prevEth:0,
          prevUSDT:0,

          scan:'ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE',
          address:'0x165CD37b4C644C2921454429E7F9358d18A45e14',
          arrays:[],
          sting:[],
          transactions:0,
          dollarEth:0,
 
          
        }
    }
    

async loadBalance(){
    this.setState({prevEth:this.state.ethBalance,prevUSDT:this.state.tether,prevState:this.state.dollarValue, prevTotal:this.state.totalDonation},()=>console.log)
    //https://api.blockcypher.com/v1/eth/main/addrs/0x165CD37b4C644C2921454429E7F9358d18A45e14/balance?token=bc6ad99ae7cc4b3ab4c28916c6644343 
  fetch('https://api.blockcypher.com/v1/eth/main/addrs/0x165CD37b4C644C2921454429E7F9358d18A45e14/balance')
  .then(res => res.json())
  .then((data) => {
     //console.log(data)

    this.setState({ethBalance:data.balance/1000000000000000000, spentEth:data.total_sent/1000000000000000000,totalEth:data.total_received/1000000000000000000},()=>console.log()) 
    //this.setState({dollarValue:this.state.dollarPerbtc * this.state.btcBalance})
   // this.setState({totalDonation:parseInt(this.state.dollarPerbtc) * parseInt(this.state.totalBTC)},()=>console.log()) 
     // this.handleBtc();
  }
  
    )
  .catch(console.log)
//https://api.blockcypher.com/v1/eth/main/addrs/0x165CD37b4C644C2921454429E7F9358d18A45e14/balance

   // let x = []
    

   


    /*fetch('https://api.etherscan.io/api?module=account&action=txlist&address='+this.state.address+'&startblock=6&endblock=99999999&page=1&offset=10000&sort=asc&apikey='+this.state.scan)
    .then(res => res.json())
    .then((data) => {
     
        this.setState({sting:data.result},()=>console.log())
        //0x7ec156c645945e512a45276e124b6f5f014b21a0
      console.log(data.result)
        x = this.state.sting.filter((address,i)=>{
                   
             return address.to === '0x77ab999d1e9f152156b4411e1f3e2a42dab8cd6d';
         
         })

         for (var m = 0;m <= x.length -1; m++){
            this.setState({transactions:this.state.transactions + parseInt(x[m].value)},()=>console.log())
         }

         this.setState({spentEth:this.state.transactions/1000000000000000000},()=>console.log())
       
         this.setState({dollarValue:this.state.dollarPerEth * this.state.ethBalance + this.state.tether},()=>console.log())
         this.setState({totalDonation:this.state.dollarPerEth * this.state.spentEth + this.state.spentUSDT + this.state.dollarValue},()=>console.log()) 
         this.handleEth();
        }

    
    )
    .catch(console.log)*/

    const balance = await web3.eth.getBalance("0x165CD37b4C644C2921454429E7F9358d18A45e14");
    const usdt = new web3.eth.Contract(usdt_abi, usdt_address);
   // this.setState({ethBalance:web3.utils.fromWei(balance)},()=>console.log())

    this.setState({usdtContract:usdt});


    const usdtBal = await this.state.usdtContract.methods.balanceOf("0x165CD37b4C644C2921454429E7F9358d18A45e14").call();
    const usdtBalance = usdtBal;
 
    this.setState({tether:usdtBalance/1000000},()=>console.log())

    
    if(this.state.spentUSDT === 0){
    this.state.usdtContract.getPastEvents("Transfer",{filter: {from:'0x165cd37b4c644c2921454429e7f9358d18a45e14'},fromBlock: 0, toBlock:'latest'})
    .then(events=>{
    var transactions = events;
    let spent = 0
    for (var i = 0; i <= transactions.length - 1; i++){
      //spent + (transactions[].returnValues.value/1000000)
      this.setState({spentUSDT:parseInt((this.state.spentUSDT + (transactions[i].returnValues.value/1000000)))},()=>console.log())
  
  }



  //this.setState({dollarValue:this.state.dollarPerEth * this.state.ethBalance + this.state.tether},()=>console.log())
 // this.setState({totalDonation:this.state.dollarPerEth * this.state.totalEth + this.state.tether + this.state.spentUSDT},()=>console.log()) 
  setInterval(()=>this.total(),2000);

  }).catch((err)=>console.error(err))
}



//if(this.state.totalDonation < 0){
   
 
   //this.total();
  // this.handleEth();
     
}


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {               
                this.setState({dollarPerEth: data.ethereum.usd},()=>console.log())
            }               
              )
              .catch(console.log)
              setInterval(()=>this.loadBalance(),45000)
}  



async getLogo(){

       //fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false')
       
        fetch('https://blockchain.info/rawaddr/357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P?fbclid=IwAR2o5Ap0KIZTUCv7hnEscQppvIiZWKCHBvZrGsNuhJzWE30jSnfkLB_BuKQ')
       .then(res => res.json())
       .then((data) => {
       //  this.setState({logo: data.image.small},()=>(console.log()))}
       }
       )
       .catch(console.log)
   
     }

total(){
    this.setState({dollarValue:this.state.dollarPerEth * this.state.ethBalance + this.state.tether},()=>console.log())
    this.setState({totalDonation:this.state.dollarPerEth * this.state.totalEth + this.state.tether + this.state.spentUSDT},()=>console.log()) 
    if(this.state.prevTotal !== this.state.totalDonation){
    this.handleEth();
    }
}

handleEth = e => {
    // if (this.props.onChange) {
        this.props.onChange(this.state.totalDonation);
               
    };
    

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
        if(this.state.prevEth < this.state.ethBalance && this.state.prevEth !== 0){
            fontColor = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevEth > this.state.ethBalance){
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



        let fontColor3 = 'rgb(154, 236, 87)';
        if(this.state.prevUSDT < this.state.tether && this.state.prevUSDT !== 0){
            fontColor3 = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevUSDT > this.state.tether){
            fontColor3 = 'rgba(230, 26, 60)';
        }
        else{
            fontColor3 = 'rgb(240, 243, 237)';
        }



        let eth =<p>Ether Balance: <AnimatedNumber component="text" value={this.state.dollarValue} style={{
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

        
        let usdt = <p>USDT Balance: $<AnimatedNumber component="text" value={this.state.dollarValue} style={{
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
    
      let total = <div>
            <a href="https://etherscan.io/txs?a=0x165CD37b4C644C2921454429E7F9358d18A45e14&f=2" target ="blank"> Moved:  {numeral(this.state.spentEth).format('0,0.00')} ETH</a>
              <div> <a href="https://etherscan.io/txs?a=0x165CD37b4C644C2921454429E7F9358d18A45e14&f=2" target ="blank"> ${numeral(this.state.spentUSDT).format('0,0.')} USDT</a></div>
              <div> <a href="https://etherscan.io/txs?a=0x165CD37b4C644C2921454429E7F9358d18A45e14&f=2" target ="blank" className="total">Total Donated Value: ${numeral(this.state.totalDonation).format('0,0.')} USDT</a></div>
      </div>
      
      
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
                {total}

               <div className="foot">
                <h4>The government of Ukraine is now accepting cryptocurrency donations. Bitcoin, Ethereum & USDT.</h4>
                </div>
            </div>
            
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.loadBalance();
        this.getDollarValue();
      //  this.getLogo();
       
             
      }
    
}


export default UkraineGOV;