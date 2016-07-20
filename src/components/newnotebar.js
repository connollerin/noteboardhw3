import React, { Component } from 'react';

class NewNoteBar extends Component {
  constructor(props) {
    super(props);
    NewNoteBar.propTypes = {
      addNote: React.PropTypes.func,
    };
    this.state = { newtitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ newtitle: event.target.value });
    this.props.addNote(event.target.value);
  }
  render() {
    return (
      <div>
        <h1>Create a new note!</h1>
        <input onChange={this.onInputChange} value={this.state.newtitle} />
      </div>
    );
  }
}

export default NewNoteBar;
