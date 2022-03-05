import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import binanceLogo from '../binance.png';


//let Web3 = require('web3');
let numeral = require('numeral');


class Binance extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

          unicef_BUSD:2505000,
          isans_BNB:1030,

          dollarPerBinance:0,
          dollarValue:0,

          prevState:0,
          prevEth:0,
          prevUSDT:0,

          
        }
        
    }
    

async loadBalance(){
    this.setState({prevEth:this.state.ethBalance,prevState:this.state.dollarValue},()=>console.log())

    //const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fdcf7b76a5e04f598a89724994743046"))
    //const balance = await web3.eth.getBalance("0x1b4A932BFE0Bb8fF56029bc1d0502Cce639388EB");
    //this.setState({ethBalance:web3.utils.fromWei(balance),wethBalance:185.01},()=>console.log())

    this.setState({dollarValue:(this.state.dollarPerBinance * parseInt(this.state.isans_BNB)) + this.state.unicef_BUSD},()=>console.log())
    if(this.state.prevState !== this.state.dollarValue){
    this.handleBinance()
    }
    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {        
                
                this.setState({dollarPerBinance: data.binancecoin.usd},()=>console.log())
                this.loadBalance()

            }               
              )
              .catch(console.log)
}  


async getInternal(){

    fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&address=0x165CD37b4C644C2921454429E7F9358d18A45e14&tag=latest&apikey=ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE')
        .then(res => res.json())
            .then((data) => {          
                console.log(data)
            }               
              )
              .catch(console.log)
              setInterval(()=>this.loadBalance(),15000)



/*    fetch('https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query' {
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }'
}*?


https://api.etherscan.io/api
   ?module=account
   &action=txlistinternal
   &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
   &startblock=0
   &endblock=2702578
   &page=1
   &offset=10
   &sort=asc
   &apikey=YourApiKeyToken

    /*fetch('https://api.etherscan.io/api
   ?module=account
   &action=txlistinternal
   &address=0x4508401BaDe71aE75fE70c97fe585D734f975502
   &startblock=0
   &endblock=2702578
   &page=1
   &offset=10
   &sort=asc
   &apikey=YourApiKeyToken')
       .then(res => res.json())
       .then((data) => {
         
         this.setState({logo: data.image.small},()=>(console.log()))}
       )
       .catch(console.log)*/
   
     }

   


handleBinance = e => {
       // if (this.props.onChange) {
        this.props.onChange(this.state);
              
      };



round(value){
    if (value){  
        return numeral(10000000).format('0,0');        
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
        

        //let dollarChange = () => this.handleDAO(this.state.dollarValue)
        //();

    



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


        let eth =<p>Target Donation: $<AnimatedNumber component="text" value={10000000} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor2}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}></AnimatedNumber></p>;

        
      
        let total = <div>
            <a href="https://etherscan.io/tx/0xf638a4c9ade8c7366b685a1ba22e19246e2b6bdc1f41966a658661174c727ba4" target ="blank"> Moved:  {numeral(this.state.unicef_BUSD).format('0,0.00')} BUSD to UNICEF</a>
            <div><a href="https://explorer.binance.org/tx/806B48180F3121DB899DB19B96CADD9D333CC3632D3EFF6CF44EB223EB3D3A78" target ="blank">  {numeral(this.state.isans_BNB).format('0,0.00')} BNB to ISANS</a></div>
            <div><a href="https://explorer.binance.org/tx/806B48180F3121DB899DB19B96CADD9D333CC3632D3EFF6CF44EB223EB3D3A78" target ="blank" className="total">Total Donated Value: $ {numeral(this.state.dollarValue).format('0,0.00')}</a></div>
         </div>
      
        return (
            <div className='cards'>
            <div className='cards-inner'>
                <div className="title">
                <img className="daoLogo" src={binanceLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Binance Charity</h3>
    
               </div>
               <div>Website: <a href="https://www.binance.charity/Ukraine-Emergency-Relief-Fund" target ="blank">https://www.binance.charity</a></div>
               <h4>Binance Chain Wallet: <a href="https://etherscan.io/address/0x1b4A932BFE0Bb8fF56029bc1d0502Cce639388EB" target ="blank">0x1b4A932BFE0Bb8fF56029bc1d0502Cce639388EB</a></h4>
               <h4>Bitcoin Wallet: <a href="https://www.blockchain.com/btc/address/bc1ql0vc0c6ge2d3axee4z3l5zv5mwd3w7f7srnspc" target ="blank">bc1ql0vc0c6ge2d3axee4z3l5zv5mwd3w7f7srnspc</a></h4>

               {eth}
           
               {total}
              
               </div>
               <div className="foot">
                <h4> A humanitarian aid initiative founded by the Web3 community. Previously raised $1 Million in 30 seconds for Ukraine through NFTs.</h4>
                </div>
            </div>
            
        );
    }

    componentDidMount() {
        this._isMounted = true; 
        this.getDollarValue();
       // this.getInternal();
       
             
      }
    
}


export default Binance;