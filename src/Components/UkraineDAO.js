import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import ukraineDaoLogo from '../UkraineDao.jpg';


let Web3 = require('web3');
let numeral = require('numeral');


class UkraineDAO extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        
        this.state = {

          ethBalance:0,
          wethBalance:0,
          bloackNumber:0,
          dollarPerEth:0,
          dollarValue:0,

          prevState:0,
          prevEth:0,
          prevUSDT:0,

          
        }
        
    }
    

async loadBalance(){
    if(this._isMounted){
    this.setState({prevEth:this.state.ethBalance,prevState:this.state.dollarValue},()=>console.log)

    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fdcf7b76a5e04f598a89724994743046"))
    //const balance = await web3.eth.getBalance("0x4508401BaDe71aE75fE70c97fe585D734f975502");
    const balance = await web3.eth.getBalance("0x633b7218644b83D57d90e7299039ebAb19698e9C");
    this.setState({ethBalance:web3.utils.fromWei(balance),wethBalance:2166},()=>console.log())
    this.setState({dollarValue:this.state.dollarPerEth * (this.state.wethBalance + parseInt(this.state.ethBalance))},()=>console.log())
    setInterval(()=>this.loadBalance(),21000)
    if(this.state.prevEth !== this.state.ethBalance){
    this.handleDAO()
    }
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

   


handleDAO() {
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
            return numeral(this.state.dollarValue).format('0,0.');      
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
    
      
      
        let total = <div>
            <a href="https://etherscan.io/tx/0xeb6d584b34927f75e30539dfbefb1b013e5c5863fdc3ec297682e9def5e64b3c" target ="blank"> Moved:  {numeral(1550.5).format('0,0.00')} ETH to Come Back Alive</a>
            <div><a href="https://etherscan.io/tx/0x8134925e23be0ded6338dad943d25167de6cc1e5f15731bb03139d8561ea0eba#internal" target ="blank">  {numeral(387.63).format('0,0.00')} ETH to Ukraine Government</a></div>
            <div><a href="https://etherscan.io/tx/0xc3b3bb07117c3e177a578c7878a1633e16e79bc954531da62fdacfe0856cd8ef#internal" target ="blank">  {numeral(190.49).format('0,0.00')} ETH to Outright</a></div>
            <div><a href="https://etherscan.io/tx/0x3a60a57a5636fd24958e73d86b9d3b4b5423f5e7617f7ba1a907022554df18b4#internal" target ="blank">  {numeral(4.43).format('0,0.00')} ETH to Psychology for Human Rights</a></div>
      
            <div> <a href="https://etherscan.io/address/0x633b7218644b83D57d90e7299039ebAb19698e9C#internaltx" target ="blank" className="total">Total Donated Value: ${numeral(this.state.dollarValue).format('0,0.')}</a></div>
         </div>
      
        return (
            <div className='cards'>
                <div className='cards-inner'>
                <div className="title">
                <img className="daoLogo" src={ukraineDaoLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Ukraine DAO</h3>
               
               </div>
               <div>Website: <a href="https://www.ukrainedao.love/" target ="blank">https://www.ukrainedao.love</a></div>
               <h4>Ethereum Wallet: <a href="https://etherscan.io/address/0x633b7218644b83D57d90e7299039ebAb19698e9C" target ="blank">0x633b7218644b83D57d90e7299039ebAb19698e9C</a></h4>
               {eth}
               
               <p> Current Donation Value: ${numeral(this.state.ethBalance * this.state.dollarPerEth).format('0,0')}</p>
               {total}
               
               </div>
               <div className="foot">
                <h4> A DAO raising ETH to help Ukrainian civilians suffering from the war in Ukraine, organized by humanitarian activists such as PussyRiot & PleaserDAO.</h4>
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


export default UkraineDAO;