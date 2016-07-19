import React, { Component } from 'react';
import Immutable from 'immutable';
import marked from 'marked';
import Welcome from './welcome';
import Note from './note';
import NewNoteBar from './newnotebar';

console.log(marked('I am using _markdown_.'));

// example class based component (smart component)
class App extends Component {

  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      selectedNote: null,
    };
  }

  addNote(name) {
    const newNote =
      {
        title: 'name',
        text: '# large',
        x: 400,
        y: 12,
        zIndex: 26,
      };
    const id = 4;
    this.setState({
      notes: this.state.notes.set(id, newNote),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  editNote(id) {
    const fields = 'blah';
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  moveNote() {

  }


  render() {
    return (
      <div className="main">
        <Welcome />
        <NewNoteBar id="newnotebar" onSearchChange={text => this.addNote(text)} />
        <br></br>
        <div id="notesection">
          {this.state.notes.entrySeq().map(([id, note]) =>
            < Note key={id} id={id} note={note} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
