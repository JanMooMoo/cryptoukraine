import React, { Component } from 'react';
import Flag from '../flag2.png';
import Artist from '../artist.jpg';
//import { Bar, Doughnut} from '@react-chartjs-2/react-chartjs-2';
//import { Bar } from "@reactchartjs/react-chart.js";
import { Bar, Doughnut} from 'react-chartjs-2';


let numeral = require('numeral');

class BargraphCoin extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
           currency:['ETH','BTC','USDT','BUSD','BNB'],
           data:[200,300]
           
      }
    }
    render() {

      console.log(this.props.bitcoin)

        this.barData = (canvas) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(800,200,500,800,200);
            gradient.addColorStop(1, 'white');
            gradient.addColorStop(0, 'rgb(0, 5, 14)');
    
            const gradient2 = ctx.createLinearGradient(100,120,100,100,200);
            gradient2.addColorStop(1, 'rgb(104, 160, 206)');
            gradient2.addColorStop(0, 'rgb(100, 101, 102)');
         
            return {
              //labels: this.state.label.map(event=>[event]),
              //data: this.state.data.map(event=>event),
            
              labels: [   numeral(parseInt(this.props.dao.wethBalance + parseInt(this.props.relief.ethBalance) + this.props.relief.wethBalance + this.props.relief.wethBalance_2 + this.props.relief.wethBalance_3)).format('0,00') +' ETH',
              numeral(this.props.bitcoin.totalBTC).format('0,00') + ' BTC',
              'USDT',
              numeral(this.props.binance.unicef_BUSD).format('0,00') +' BUSD',
              numeral(this.props.binance.isans_BNB).format('0,00') + ' BNB',
              numeral(this.props.unchain.nearBalance).format('0,00') + ' NEAR'],
             /* datasets: [{
                label:'Hydro',
                fontColor:'black',
                backgroundColor: [gradient,gradient,gradient,gradient,gradient],
                borderColor: 'rgb(228, 83, 138)',
                borderWidth: .8,
                hoverBorderColor: 'pink',
                hoverBorderWidth:1,
                weight:5,
                borderAlign:'center',
               
                }],					
                }	 */
                
                  datasets: [{
                label: ' Value In Million Dollars',
                fontColor:'white',
                borderWidth: 4,
                hoverBorderColor: 'rgb(245, 188, 64)',
                hoverBorderWidth:1,
                weight:.2,
                borderAlign:'center',
                
                backgroundColor: ['rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)'],
                borderColor: [
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white'    
                ],
                data: [(parseInt(this.props.dao.dollarValue + this.props.relief.dollarValue)/1000000).toFixed(2),
                (this.props.bitcoin.totalDonation/1000000).toFixed(2) ,
                5,
                (this.props.binance.unicef_BUSD/1000000).toFixed(2),
                (this.props.binance.isans_BNB * this.props.binance.dollarPerBinance/1000000).toFixed(2),
                (this.props.unchain.dollarValue/1000000).toFixed(2)],	
                
              }]
              
            }
              }
        return (
         
                 <div className="chartbackground">
                 
                
            
                 <div style ={{ postion:"relative", width: '100%', height:500 }}>
              <Bar 
                options={{
                responsive:true,
                maintainAspectRatio:false,
                title:{
                display: true,
                position:"top",
                text: 'In Millions',
                fontSize: 18,
                lineHeight:3,
                padding:1,
                fontColor:'white',                   
                },    
                scales: {
                  yAxes: [{ticks: {beginAtZero:true,fontSize:15,fontColor:'white',fontStyle: '600',precision:0 }}],
                  xAxes: [{ticks: {beginAtZero:true,fontSize:15,fontColor:'white', fontStyle: '600' },barPercentage:.8}]
                },
                elements:{
                rectangle:{borderSkipped:'bottom',}
                }  
                }} data={this.barData}/>
              </div> 
              </div>

              
            
            
        );
    }
}

export default BargraphCoin;