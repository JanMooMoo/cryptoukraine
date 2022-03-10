import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import aidLogo from  '../aidforUkraine.jpg';
//import { ApiPromise, WsProvider } from '@polkadot/api';

let numeral = require('numeral');
const web3 = require("@solana/web3.js");


class Aidforukraine extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        
        this.state = {

          tx_3:13800,
          tx_2:1001001,
          tx_1:5200,

          solAddress:"66pJhhESDjdeBBDdkKmxYYd7q6GUggYPWjxpMKNX39KV",
          
          USDC:1020001,
          solBalance:0,
          dollarPerSol:0,
          dollarValue:0,
          totalDonation:0,

          prevState:0,
          prevSol:0,
          prevUSDT:0,

          
        }
        
    }
    

async loadBalance(){

    if(this._isMounted){
    this.setState({prevSol:this.state.solBalance,prevState:this.state.dollarValue},()=>console.log())

    
    let solana = new web3.Connection('https://api.mainnet-beta.solana.com');

    //let slot = await solana.getSlot();
    // 93186439
    //let blockTime = await solana.getBlockTime(slot);
    //console.log(blockTime);
    // 1630747045   
    //let block = await solana.getBlock(slot);
     // console.log(block);
     // (async () => {
    //console.log(await solana.getSignaturesForAddress(publicKey, {limit: 1000}));

    const publicKey = await new web3.PublicKey(this.state.solAddress);

    const balance =  await solana.getBalance(publicKey)  
    this.setState({solBalance:balance/1000000000},()=>console.log())

    this.setState({dollarValue:this.state.dollarPerSol * this.state.solBalance,totalDonation:(this.state.dollarPerSol * this.state.solBalance)+ this.state.USDC},()=>console.log())
    setInterval(()=>this.loadBalance(),120000)
    if(this.state.prevState !== this.state.dollarValue){
    this.handleAid()
    }
}
    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {        
                
                this.setState({dollarPerSol: data.solana.usd},()=>console.log())
                this.loadBalance()

            }               
              )
              .catch(console.log)
}  


   


handleAid = e => {
       // if (this.props.onChange) {
        this.props.onChange(this.state);
              
      };



round(value){
    if (value){  
        return numeral(this.state.solBalance).format('0,0.0000');        
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
        if(this.state.prevSol < this.state.solBalance && this.state.prevSol !== 0){
            fontColor = 'rgb(117, 202, 47)';
        }
        else if(this.state.prevSol > this.state.solBalance){
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


        let sol =<p>Solana Balance: <AnimatedNumber component="text" value={this.state.solBalance} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}></AnimatedNumber> SOL</p>;

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
            <a href="https://explorer.solana.com/tx/3dPRwpPK6hDLoqWihYryvTey9UyzCJVaGoU4GRnT57c1BUMxW9RFZzGwiEVLJL5eGueTLdtX1oiGXmRQKHXohmNs" target ="blank"> Moved:  ${numeral(this.state.tx_1).format('0,0.00')} USDC</a>
            <div><a href="https://explorer.solana.com/tx/4MDfojNg8Dtvt2Dfgiuy45XwUVS68Bh8nZCA1QukqsQ9DsEJEM3GnFd2Fk6YK64DeZNBGi7yhbpNLWW2Xn5cqkCM" target ="blank">  ${numeral(this.state.tx_2).format('0,0.00')} USDC</a></div>
            <div><a href="https://explorer.solana.com/tx/3fS12bwo9B5EEpszFPN3Q7Nu6rBnLcnP4Zoi41gEkWnteK8s4XpcsRfV5h8zESxLWvjaZZoT2uita9wzPY4TisBU" target ="blank">  ${numeral(this.state.tx_3).format('0,0.00')} USDC</a></div>
            <div><a href="https://explorer.solana.com/tx/3dPRwpPK6hDLoqWihYryvTey9UyzCJVaGoU4GRnT57c1BUMxW9RFZzGwiEVLJL5eGueTLdtX1oiGXmRQKHXohmNs" target ="blank" className="total">Total Donated Value: $ {numeral(this.state.totalDonation).format('0,0.00')}</a></div>
         </div>
      
        return (
            <div className='cards'>
            <div className='cards-inner'>
                <div className="title">
                <img className="daoLogo" src={aidLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Aid for Ukraine</h3>
    
               </div>
               <div>Website: <a href="https://nation.io/dao/ukraine" target ="blank">https://nation.io/dao/ukraine</a></div>
               <h4>Solana Wallet: <a href="https://explorer.solana.com/address/66pJhhESDjdeBBDdkKmxYYd7q6GUggYPWjxpMKNX39KV" target ="blank">66pJhhESDjdeBBDdkKmxYYd7q6GUggYPWjxpMKNX39KV</a></h4>

               {sol}
               {dollar}
               {total}
              
               </div>
               <div className="foot">
                <h4> Aid for Ukraine is a collaboration between the Government of Ukraine, Everstake, and friends from the crypto community around the world.</h4>
                </div>
            </div>
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.getDollarValue();
       // this.getInternal();      
      }

      componentWillUnmount(){
        this._isMounted = false;
    }
    
}


export default Aidforukraine;