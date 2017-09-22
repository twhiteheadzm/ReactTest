import React from "react";

function Definitions(props){  
  const listItems = props.definitions.map((definition,i) =>
    <li key={i}>{definition}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default class Definition extends React.Component {
  constructor(props) {
    super(props);   
  }

  render() {
    console.log('render definition',this.props)    
    if (!this.props.definition.definitions){
      return null;
    }
    return (
      <div class="definition">
        <div class="word">
          {this.props.definition.word}          
        </div>
        <div class="type">
          {this.props.definition.type}
        </div>
        <div class="definitions">
          <Definitions definitions={this.props.definition.definitions}/>          
        </div>
      </div>
    );
  }
}