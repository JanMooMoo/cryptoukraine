import React, { Component } from 'react';
import Flag from '../flag2.png';
import Artist from '../artist.jpg';
//import { Bar, Doughnut} from '@react-chartjs-2/react-chartjs-2';
//import { Bar } from "@reactchartjs/react-chart.js";
import { Bar, Doughnut} from 'react-chartjs-2';


let numeral = require('numeral');

class Bargraph extends Component {
    _isMounted = false;
    constructor(props, context) {
        super(props);
        this.state = {
           currency:['ETH','BTC','USDT','BUSD','BNB'],
           data:[200,300],
           
      }
    }
    render() {
        let body = '';
     // console.log(this.props.doughnut)

        this.DoughnutData= (canvas) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(100,180,100,100,200);
          gradient.addColorStop(1, 'white');
          gradient.addColorStop(0, 'black');
  
          const gradient2 = ctx.createLinearGradient(100,120,100,100,200);
          gradient2.addColorStop(1, 'rgb(104, 160, 206)');
          gradient2.addColorStop(0, 'rgb(100, 101, 102)');
          
          return {
            labels: ['Reli3f','Unchain', 'Binance', 'Ukraine DAO', 'Govt of Ukraine-BTC', 'Govt of Ukraine-ETH'],
            datasets: [{
              label:'Hydro',
              fontColor:'black',
              backgroundColor: ['rgb(164, 76, 172)','rgb(36, 216, 36)','rgb(82, 10, 82)','rgb(172, 2, 2)','rgb(245, 188, 64)','rgb(104, 160, 206)'],
              borderColor: 'white',
              borderWidth: 2,
              hoverBackgroundColor: [],
              hoverBorderColor: 'red',
              hoverBorderWidth:2,
              weight:5,
              borderAlign:'center',
              data: [
                (this.props.relief.dollarValue/1000000).toFixed(2),
                (this.props.unchain.dollarValue/1000000).toFixed(2),
                (this.props.binance.dollarValue/1000000).toFixed(2),
                (parseInt(this.props.dao.dollarValue)/1000000).toFixed(2),
                (this.props.bitcoin.totalDonation/1000000).toFixed(2),
                (this.props.ethereum.totalDonation/1000000).toFixed(2)],	
                
              }],
              //data: [soldSeats, totalSeats - soldSeats],
           					
              }	
        }

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
            
              labels: ['Reli3f','Unchain','Binance','UkraineDAO','Ukraine Govt-BTC','Ukraine Govt-ETH'],
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
                label: ' Donations In USD (Million)',
                fontColor:'white',
                borderWidth: 4,
                hoverBorderColor: 'white',
                hoverBorderWidth:1,
                weight:.2,
                borderAlign:'center',
                borderRadius:5,
                backgroundColor: ['rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)','rgb(0, 5, 14)'],
                borderColor: [
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white'    
                ],
                //['Reli3f','Binance','Unchain','UkraineDAO','Ukraine Govt-BTC','Ukraine Govt-ETH']
                data: [
                (this.props.relief.dollarValue/1000000).toFixed(2),
                (this.props.unchain.dollarValue/1000000).toFixed(2),
                (this.props.binance.dollarValue/1000000).toFixed(2),
                (parseInt(this.props.dao.dollarValue)/1000000).toFixed(2),
                (this.props.bitcoin.totalDonation/1000000).toFixed(2),
                (this.props.ethereum.totalDonation/1000000).toFixed(2)],	
                
              }]
              
            }
              }
   //if(this.props.dao.dollarValue === undefined){
              if(this.props.ethereum.totalDonation === undefined){
                body=''
              }
              else if(!this.props.doughnut){
                  body = <div  className="back" style ={{ postion:"relative", width: '100%', height:500 }}>
                  <Bar 
                    options={{
                    responsive:true,
                    maintainAspectRatio:false,
                    title:{
                    display: true,
                    position:"top",
                    text: 'Donations In USD (Million)',
                    fontSize: 18,
                    lineHeight:3,
                    padding:1,
                    fontColor:'white',                   
                    },    
                    scales: {
                      yAxes: [{gridLines: {drawOnChartArea: true,color:'rgb(138, 137, 137)'},
                    ticks:{beginAtZero:true,fontSize:17,fontColor:'white',fontStyle: '600',precision:0 }}],
                      xAxes: [{gridLines: {drawOnChartArea: false},ticks: {beginAtZero:true,fontSize:15,fontColor:'white', fontStyle: '600' },barPercentage:.8}]
                    },
                    elements:{
                    rectangle:{borderSkipped:'bottom',}
                    }  
                    }} data={this.barData}/>
                  </div> 
              }
              else{
                body =  
                <div  className="back" style ={{ postion:"relative", width: '100%', height:500 }}>
                <Doughnut data={this.DoughnutData} 
    						options={{
							  responsive:true,
							  maintainAspectRatio:false,
							  cutoutPercentage: 62, 
        					title:{
       						display: true,
        					position:"top",
       						text: 'Donations In USD (Million)',
        					fontSize: 16,
        					lineHeight:2,
        					padding:1.6,
							    fontColor:'white',   
							    }, 
							  legend: {
               
							  	display:true,
                  lineHeight:5.5, 
                  position:"bottom",
								  labels: {
                    
									fontColor: 'white',
									fontSize:15,	
                  lineHeight:5.5,                
                  spacing:10,
								},
							  tooltips: {
           				enabled: true
        					},
							  }
    					}}/> 

						  </div>
              }
            
        return (
         
                 <div className="chartbackground">
                 
                
            {body}
                 
              </div>

              
            
            
        );
    }
    componentDidMount() {
        this._isMounted = true; 
       // this.loadToken();
      }

      componentWillUnmount(){
        this._isMounted = false;
    }
}


export default Bargraph;