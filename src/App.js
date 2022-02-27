import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import UkraineDAO from './Components/UkraineDAO';
import UkraineGOV from './Components/UkraineGOV';



let Web3 = require('web3');


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {

      

      


        loading:true,
         
      }
    }



    render(){

  return (
    <div className="App">
      <Navbar/>
      
       <header className="App-header">
   
    

        <div className="body">
        <div className="row">

        <div className="column">
        <UkraineGOV/>
        </div>
        
        <div className="column">
        <UkraineDAO/></div>   

        <div>
         </div>
         </div>
         
             
         

         </div>
     </header>
     
         <p className='footer'>This site is for tracking purposes only, we are not affiliated with any organization or party shown in this site.</p>

    </div>
    
  );
}

componentDidMount() {
  this._isMounted = true; 
 // this.loadToken();
}


}


export default App;