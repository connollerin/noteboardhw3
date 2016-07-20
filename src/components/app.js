import React, { Component } from 'react';
import Immutable from 'immutable';
import Welcome from './welcome';
import Note from './note';
import NewNoteBar from './newnotebar';

// ordered map could help for keeping notes in order

// example class based component (smart component)
class App extends Component {

  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      selectedNote: null,
    };

    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  addNote(name) {
    const newNote =
      {
        title: name,
        text: '# write here!',
        x: 400,
        y: 12,
        zIndex: 26,
      };
    const id = Math.random().toString();
    this.setState({
      notes: this.state.notes.set(id, newNote),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  editNote(id, note) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, note); }),
    });
  }


  render() {
    console.log(this.state.notes);
    return (
      <div className="main">
        <Welcome />
        <NewNoteBar id="newnotebar" addNote={this.addNote} onSearchChange={text => this.addNote(text)} />
        <br></br>
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => return (
              < Note key={id} id={id} note={note} editNote={this.editNote} />
            );
          )}
        </div>
      </div>
    );
  }
}

export default App;
