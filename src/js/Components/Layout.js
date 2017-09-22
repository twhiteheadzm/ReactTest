import React from "react";

import Search from "./Search";

import Definition  from "./Definition";

import $ from 'jquery';

const getDefinition = value => {
  return new Promise((resolve, reject) => {

    var url = "http://demo4381657.mockable.io/";

    $.ajax({
      method: "GET",
      url: url + 'definition',
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      failure: function (error) {
        console.log(error)
        reject();
      }
    });
  })
};

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      word:'',
      definition:{}
    };
  }

  onSuggestionSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
    console.log(suggestionValue)

    getDefinition(suggestionValue).then(result=>{
      this.setState({
        word:suggestionValue,
        definition:result
      }
      )
    })

    this.setState({word: suggestionValue});
  };
  
  
  render() {
    return (
      <div>
        <Search onSuggestionSelected={this.onSuggestionSelected}/>
        <Definition definition={this.state.definition}/>
      </div>
    );
  }
}