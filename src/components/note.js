import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

// dont need state unless you have editing within the node
// could have a state for editing (textbox) and non-editing- the box
// because you can't change your props, need to pass in the edit function

class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      text: this.props.note.text,
    };
    Note.propTypes = {
      editNote: React.PropTypes.func,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onEdit(event) {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
      this.props.editNote(this.props.id, this.state);
    } else {
      this.setState({ isEditing: true });
    }
  }
  onInputChange(event) {
    this.setState({ text: event.target.value });
  }
  renderSomeSection() {
    if (this.state.isEditing) {
      return <Textarea onChange={this.onInputChange} defaultValue={this.state.text} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.text) || 'oops' }} />;
    }
  }
  render() {
    const statex = this.props.x;
    const statey = this.props.y;
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ statex, statey }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div className="titlebar">
            <div className="title">
              {this.props.note.title}
            </div>
            <div className="icons">
              <i onClick={this.onEdit} className="fa fa-pencil-square-o"></i>
              <i onClick={this.onDeleteClick} className="fa fa-trash-o"></i>
              <i onClick={this.onMoveClick} className="fa fa-arrows"></i>
            </div>
          </div>
          {this.renderSomeSection()}
        </div>
      </Draggable>
    );           // find a way to add marked inside the dangerouslySetInnerHTML!
  }
}

export default Note;
