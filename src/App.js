import React from 'react';
import './App.css';

class HelloWorld extends React.Component {
  state= {
    show: true
  }

  render() {
    if(this.state.show)
    {
      return (
        <div id="hello">
           <h1>{this.props.mytext}</h1> 		
           <p>{this.props.subtitle}</p>
        </div>      
      )
    }
    else{
       return <h2>There are no elements. Show=false</h2>
    }
  }
}


function App() {
  return (
    <div>
      <HelloWorld mytext="Hello" subtitle="lorem zzzzzzzzzzzzzzzzzzpppppppppp"/> 
    </div>
  );
}

export default App;
