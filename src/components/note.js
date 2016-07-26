import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

// note component contains the title and content of a note and allows the user to drag, edit, and delete the note by connecting back to the app
// smart component to keep track of editing state and icon switches in addition to position and other props given from the app

class Note extends Component {

  constructor(props) {
    super(props);

    Note.propTypes = {
      editNote: React.PropTypes.func,
      deleteNote: React.PropTypes.func,
      changeText: React.PropTypes.func,
      moveNote: React.PropTypes.func,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
  }
  // whenever the text is edited, need to update the zindex to move the note to the front and the icons showing editing state
  onEdit(event) {
    if (this.props.note.isEditing) {
      this.props.editNote(this.props.id, !this.props.note.isEditing, this.props.updatezIndex + 1, 'fa fa-pencil-square-o');
    } else {
      this.props.editNote(this.props.id, !this.props.note.isEditing, this.props.updatezIndex + 1, 'fa fa-check');
    }
  }
  onDeleteClick(event) {
    this.props.deleteNote(this.props.id);
  }
  onInputChange(event) {
    this.props.changeText(this.props.id, event.target.value);
  }
  // zindex is updated whenever dragged
  // onStartDrag() {
  //   this.setState({ zIndex: this.props.updatezIndex + 1 });
  //   this.moveNote();
  // }
  // used https://github.com/mzabriskie/react-draggable/blob/master/example/index.html for moving with deltaX deltaY
  onDrag(e, ui) {
    this.props.moveNote(this.props.id, this.props.note.x + ui.deltaX, this.props.note.y + ui.deltaY);
  }
  // just changing the zIndex for ordering
  onStartDrag() {
    this.props.editNote(this.props.id, this.props.note.isEditing, this.props.updatezIndex + 1, this.props.note.editIcon);
  }
  // uses text area for editing and marked html for non editing state
  renderSomeSection() {
    if (this.props.note.isEditing) {
      return <Textarea onChange={this.onInputChange} defaultValue={this.props.note.text} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) || 'oops' }} />;
    }
  }

// Draggable component for the individual notes to be moved around
// http://jqueryui.com/draggable/#snap-to for grid ideas
  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[10, 10]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={{ zIndex: this.props.note.zIndex }}>
          <div className="titlebar">
            <div className="title">
              {this.props.note.title}
            </div>
            <div className="icons">
              <i onClick={this.onEdit} className={this.props.note.editIcon}></i>
              <i onClick={this.onDeleteClick} className="fa fa-trash-o"></i>
              <i className="fa fa-arrows note-mover"></i>
            </div>
          </div>
          {this.renderSomeSection()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
