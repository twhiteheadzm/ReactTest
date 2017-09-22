import React from 'react';

import Autosuggest from 'react-autosuggest';

import $ from 'jquery';

const getSuggestions = value => {
  return new Promise((resolve, reject) => {
    const inputValue = value
      .trim()
      .toLowerCase();
    if (inputValue.length === 0) {
      return [];
    }    
    var url = "http://demo4381657.mockable.io/";  
    $.ajax({  
      method: "GET",
      url: url + 'autocomplete', 
      dataType: "json",      
      success: function (result) {
        resolve(result.words);
      },
      failure: function (error) {
        console.log(error)
        reject([]);
      }
    });
  })
};

// When suggestion is clicked, Autosuggest needs to populate the input based on
// the clicked suggestion. Teach Autosuggest how to calculate the input value
// for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

export default class Search extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component. This means that you need to provide an
    // input value and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest, and they are
    // initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({value: newValue});
  };

  // Autosuggest will call this function every time you need to update
  // suggestions. You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
    getSuggestions(value).then(results => {
      this.setState({suggestions: results});
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };
 
  render() {
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a word',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (<Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      onSuggestionSelected={this.props.onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}/>);
  }
}