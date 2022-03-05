import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import reliefLogo from '../Reli3f.png';


let Web3 = require('web3');
let numeral = require('numeral');


class Relief extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

          ethBalance:0,
          wethBalance:0,
          wethBalance_2:0,
          wethBalance_3:0,
          bloackNumber:0,
          dollarPerEth:0,
          dollarValue:0,

          prevState:0,
          prevEth:0,
          prevUSDT:0,

          
        }
        
    }
    

async loadBalance(){
    this.setState({prevEth:this.state.ethBalance,prevState:this.state.dollarValue},()=>console.log)

    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fdcf7b76a5e04f598a89724994743046"))
    
    const balance = await web3.eth.getBalance("0x087FC456471f5f88F7756c84F04159dF3A3621D9");
    this.setState({ethBalance:web3.utils.fromWei(balance),wethBalance:185.01,wethBalance_2:185,wethBalance_3:40},()=>console.log())
    this.setState({dollarValue:this.state.dollarPerEth * (this.state.wethBalance + this.state.wethBalance_2 + this.state.wethBalance_3 + parseInt(this.state.ethBalance))},()=>console.log())
    if(this.state.prevState !== this.state.dollarValue){
    this.handleRelief()
    }
    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {          
                this.setState({dollarPerEth: data.ethereum.usd},()=>console.log())
                this.loadBalance()

            }               
              )
              .catch(console.log)
}  


async getInternal(){

    fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&address=0x165CD37b4C644C2921454429E7F9358d18A45e14&tag=latest&apikey=ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE')
        .then(res => res.json())
            .then((data) => {          
                //this.setState({dollarPerEth: data.ethereum.usd},()=>
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

   


handleRelief()  {
       // if (this.props.onChange) {
        this.props.onChange(this.state);
              
      };



round(value){
    if (value){  
        return numeral(this.state.ethBalance).format('0,0.00000000');        
        }
        
    return 0;
    }


    roundDollar(value){
        if (value){  
            return numeral(this.state.dollarPerEth * this.state.ethBalance).format('0,0.');      
            }
            
        return 0;
        }

    
    render() {
        

        //let dollarChange = () => this.handleDAO(this.state.dollarValue)
        //();

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


        let eth =<p>Ether Balance: <AnimatedNumber component="text" value={this.state.ethBalance} style={{
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
            <a href="https://etherscan.io/tx/0x71c5a611fb69494b4a9ed2bf68417868782afbac4a0e932ed1fbb2aa19f057af" target ="blank"> Moved:  {numeral(this.state.wethBalance /3).format('0,0.00')} ETH to Hospitallers</a>
            <div><a href="https://etherscan.io/tx/0x67a9d355d801548e30e309dece26dffd1c635053e4944fc65bbd222bdfea7777" target ="blank">  {numeral(this.state.wethBalance /3).format('0,0.00')} ETH to Local Ukrainian Media</a></div>
            <div><a href="https://etherscan.io/tx/0x6a89027bf9cd0d384733f21b6eaa8ef50e5beec8c881fa582ab0680077cbcdeb" target ="blank"> {numeral(this.state.wethBalance /3).format('0,0.00')} ETH to Come Back Alive</a></div>

            <div><a href="https://etherscan.io/tx/0x564c0f304cb456e9e1f5689942627cc1d8fc58f460b1dea5fdcfa1de884e48eb" target ="blank"> {numeral(this.state.wethBalance_2 /4).format('0,0.00')} ETH to Razom</a></div>
            <div><a href="https://etherscan.io/tx/0xce265d210ead99272db1c724c94b8a81e42038b35e47d26f2acde1c61c0bc16f" target ="blank"> {numeral(this.state.wethBalance_2 /4).format('0,0.00')} ETH to Serhiy Prytula Foundation</a></div>
            <div><a href="https://etherscan.io/tx/0x450abbf61af5bb3bf62f78f17dd6e512b6d6fde4ad86a8031c686b9be8ac44e1" target ="blank"> {numeral(this.state.wethBalance_2 /4).format('0,0.00')} ETH to Valery Sozanovsky HQ</a></div>
            <div><a href="https://etherscan.io/tx/0x9d006810f4b825e21bc330f1d2f1fa2631f638295e56d099df5c519e59c0858d" target ="blank"> {numeral(this.state.wethBalance_2 /4).format('0,0.00')} ETH to CEO Club</a></div>

            <div><a href="https://etherscan.io/tx/0x7a83d0bbda21cc0ac40be4f26e6b05c95f970829734e16e654692d51015e3d75" target ="blank"> {numeral(this.state.wethBalance_3 /2).format('0,0.00')} ETH to Outright Action Intl</a></div>
            <div><a href="https://etherscan.io/tx/0x7280c459e5badb3a4849061073730cd2db03275f195763fee3ad13afc5e7fab9" target ="blank"> {numeral(this.state.wethBalance_3 /2).format('0,0.00')} ETH to Web3 for Africans in Ukraine</a></div>

            
            <div> <a href="https://etherscan.io/txs?a=0x165CD37b4C644C2921454429E7F9358d18A45e14&f=2" target ="blank" className="total">Total Donated Value: ${numeral(this.state.dollarValue).format('0,0.')}</a></div>
            
         </div>
      
        return (
            <div className='cards'>
                <div className='cards-inner'>
                <div className="title">
                <img className="daoLogo" src={reliefLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Reli3f Fund</h3>
               
               </div>
               <div>Website: <a href="https://reli3f.xyz" target ="blank">https://reli3f.xyz</a></div>
               <h4>Ethereum Wallet: <a href="https://etherscan.io/address/0x087FC456471f5f88F7756c84F04159dF3A3621D9" target ="blank">0x087FC456471f5f88F7756c84F04159dF3A3621D9</a></h4>
               {eth}
               {dollar}
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


export default Relief;