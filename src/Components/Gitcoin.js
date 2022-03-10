import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import grants13Logo from  '../Gitcoin.jpg';
//import { ApiPromise, WsProvider } from '@polkadot/api';

let numeral = require('numeral');
const web3 = require("@solana/web3.js");


class Gitcoin extends Component {
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

          //git
          DAI:700000

          
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
   // this.handleAid()
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
            return numeral(this.state.DAI).format('0,0.');      
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

        let dollar = <p>Target Donation: $<AnimatedNumber component="text" value={this.state.DAI} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor2}
        )}
        duration={1500}
        formatValue={n=>this.roundDollar(n)}></AnimatedNumber>+ <a href="https://wtfisqf.com/?grant=&grant=&grant=&grant=&match=1000" target="blank"> In Quadratic Funding</a></p>;

        
      
        let total = <div>
            <a href="https://gitcoin.co/grants/explorer/?page=1&limit=12&me=false&sort_option=weighted_shuffle&collection_id=false&network=mainnet&state=active&profile=false&sub_round_slug=gr13-ukraine&collections_page=1&grant_regions=&grant_types=&grant_tags=&tenants=&idle=false&featured=true&round_type=false&round_num=13&customer_name=Ukraine&tab=grants" target ="blank"> LIVE: March 9 (8AM) MST - March 24 (6PM) MDT</a>
         </div>
      
        return (
            <div className='cards'>
            <div className='cards-inner'>
                <div className="title">
                <img className="daoLogo" src={grants13Logo} border={1} alt="UkraineDAO" ></img>

               <h3>Gitcoin Grants 13</h3>
    
               </div>
               <div>Website: <a href="https://gitcoin.co/grants/explorer/?page=1&limit=12&me=false&sort_option=weighted_shuffle&collection_id=false&network=mainnet&state=active&profile=false&sub_round_slug=gr13-ukraine&collections_page=1&grant_regions=&grant_types=&grant_tags=&tenants=&idle=false&featured=true&round_type=false&round_num=13&customer_name=Ukraine&tab=grants" target ="blank">Gitcoin Grants</a></div>
               

            
               {dollar}
               {total}
              
               </div>
               <div className="foot">
                <h4> Gitcoin Grants sustain web3 projects with Quadratic Funding. Grants-13 includes $700k for humanitarian aid to Ukranian people.</h4>
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


export default Gitcoin;