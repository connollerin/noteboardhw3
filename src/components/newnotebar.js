import React, { Component } from 'react';

// this smart component allows the user to create a new note by typing in a title
// code adapted from js-starter-workshop search bar tbh

class NewNoteBar extends Component {
  constructor(props) {
    super(props);
    NewNoteBar.propTypes = {
      addNote: React.PropTypes.func,
    };
    this.state = { newtitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onInputChange(event) {
    this.setState({ newtitle: event.target.value });
  }
  onSubmit(event) {
    this.props.addNote(this.state.newtitle);
  }
  render() {
    return (
      <div>
        <h1>Create a new note!</h1>
        <input id="searchBar" onChange={this.onInputChange} value={this.state.newtitle} /><button onClick={this.onSubmit}><i className="fa fa-plus" /></button>
      </div>
    );
  }
}

export default NewNoteBar;
