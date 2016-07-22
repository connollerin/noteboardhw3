import React, { Component } from 'react';

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
    console.log(event.target.value);
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
