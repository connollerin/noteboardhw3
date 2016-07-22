import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

// dont need state unless you have editing within the node
// could have a state for editing (textbox) and non-editing- the box
// because you can't change your props, need to pass in the edit function

// ended up keeping all the stuff so that I could edit and change it easily within here! lots of dot notation got mixed around

class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
      editIcon: 'fa fa-pencil-square-o',
    };
    Note.propTypes = {
      editNote: React.PropTypes.func,
      deleteNote: React.PropTypes.func,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }
  onEdit(event) {
    if (this.state.isEditing) {
      this.setState({ isEditing: false, zIndex: this.props.updatezIndex + 1, editIcon: 'fa fa-pencil-square-o' });
      this.props.editNote(this.props.id, this.state);
    } else {
      this.setState({ isEditing: true, editIcon: 'fa fa-check', zIndex: this.props.updatezIndex + 1 });
    }
  }
  onDeleteClick(event) {
    this.props.deleteNote(this.props.id);
  }
  onInputChange(event) {
    this.setState({ text: event.target.value });
    this.props.editNote(this.props.id, this.state);
  }
  onStartDrag() {
    this.setState({ zIndex: this.props.updatezIndex + 1 });
    this.props.editNote(this.props.id, this.state);
  }
  onDrag(e, ui) {
    const currentx = this.state.x;
    const currenty = this.state.y;
    this.setState({
      x: currentx + ui.deltaX,
      y: currenty + ui.deltaY,
    });
    this.props.editNote(this.props.id, this.state);
  }
  onStopDrag() {
    this.props.editNote(this.props.id, this.state);
  }
  renderSomeSection() {
    if (this.state.isEditing) {
      return <Textarea onChange={this.onInputChange} defaultValue={this.state.text} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.text) || 'oops' }} />;
    }
  }

  // https://rnplay.org/apps/NImYmQ
  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={{ zIndex: this.state.zIndex }}>
          <div className="titlebar">
            <div className="title">
              {this.state.title}
            </div>
            <div className="icons">
              <i onClick={this.onEdit} className={this.state.editIcon}></i>
              <i onClick={this.onDeleteClick} className="fa fa-trash-o"></i>
              <i className="fa fa-arrows note-mover"></i>
            </div>
          </div>
          {this.renderSomeSection()}
        </div>
      </Draggable>
    );           // so confused about draggable
  }
}

export default Note;
