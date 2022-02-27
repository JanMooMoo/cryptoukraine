import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';


let numeral = require('numeral');
let fontColor = 'rgb(154, 236, 87)';

class Ethbalance extends Component {

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
    
  

    round(value){
        if (value){  
            return numeral(this.props.ethBalance).format('0,0.00000000');        
            }
            
        return 0;
        }

        
  
    render() {

        let eth =<p>Ethereum Balance: <AnimatedNumber component="text" value={this.props.ethBalance} style={{
            transition: '0.1s ease-out',
            fontSize: 19,
            cursor:'pointer',
            transitionProperty:
            'background-color, color, opacity'
        }}frameStyle={perc => (
            perc === 100 ? {} : {color: fontColor}
        )}
        duration={1500}
        formatValue={n=>this.round(n)}>Price: {this.props.price}</AnimatedNumber> ETH</p>;

    

   


        return (
            <div>
               {eth}
            </div>
            
        );
    }

    
    componentDidMount() {
        this._isMounted = true; 
        //this.getDollarValue();
       // this.getLogo();
       
             
      }

      componentDidUpdate(prevProps, prevState) {
        if(prevProps.ethBalance!==this.props.eth){
            
        if(prevProps.ethBalance < this.props.ethBalance){
            fontColor = 'rgb(98, 175, 34)';
        }
        else if(prevProps.ethBalance > this.props.ethBalance){
            fontColor = 'rgba(230, 26, 60)';
        }
        else{
            fontColor = 'rgb(243, 239, 239)';
    
        }
    }
         
    }
}

export default Ethbalance;