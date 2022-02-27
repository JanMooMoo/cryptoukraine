import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import ukraineDaoLogo from '../UkraineDao.jpg';




let Web3 = require('web3');
let numeral = require('numeral');


class UkraineDAO extends Component {

    constructor(props) {
        super(props);
        this.state = {

          ethBalance:0,
          bloackNumber:0,
          dollarPerEth:0,
          dollarValue:0,
        }
    }
    

async loadBalance(){

    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/72e114745bbf4822b987489c119f858b"))
    const blockNumber = await web3.eth.getBlockNumber();
    this.setState({blocks:blockNumber},()=>console.log());

    const balance = await web3.eth.getBalance("0x4508401BaDe71aE75fE70c97fe585D734f975502");
    this.setState({ethBalance:web3.utils.fromWei(balance)},()=>console.log())
    this.setState({dollarValue:this.state.dollarPerEth * this.state.ethBalance})

    }


getDollarValue(){

fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => res.json())
            .then((data) => {          
                this.setState({dollarPerEth: data.ethereum.usd},()=>console.log())
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
                <img className="daoLogo" src={ukraineDaoLogo} border={1} alt="UkraineDAO" ></img>

               <h3>Ukraine DAO</h3>
               
               </div>
               <div>Website: <a href="https://www.ukrainedao.love/" target ="blank">https://www.ukrainedao.love/</a></div>
               <h4>Ethereum Wallet: <a href="https://etherscan.io/address/0x4508401bade71ae75fe70c97fe585d734f975502" target ="blank">0x4508401BaDe71aE75fE70c97fe585D734f975502</a></h4>
               {eth}
               {dollar}

               <div className="foot">
                <h4> A DAO raising ETH to help Ukrainian civilians suffering from the war in Ukraine, organized by humanitarian activists such as PussyRiot & PleaserDAO</h4>
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


export default UkraineDAO;