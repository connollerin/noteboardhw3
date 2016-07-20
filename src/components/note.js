import React, { Component } from 'react';
import Draggable from 'react-draggable';
// import Textarea from 'react-textarea-autosize';
// import marked from 'marked';

// dont need state unless you have editing within the node
// could have a state for editing (textbox) and non-editing- the box
// because you can't change your props, need to pass in the edit function

class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    // this.state = {
    //   title: props.note.title,
    //   x: props.note.x,
    //   y: props.note.y,
    //   zIndex: props.note.zIndex,
    //   isEditing: false,
    // };
  }

  rawMarkup() {
    return { __html: this.renderSomeSection() };
  }
  renderSomeSection() {
    if (this.state.isEditing) {
      return <div>editing!</div>;
    } else {
      return '<Textarea />'; // why did this have to be in quotes?
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
        <div className="note-mover">
          <div>
            {this.props.note.title}
            <i onClick={this.onDeleteClick} className="fa fa-trash-o"></i>
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: this.renderSomeSection() || '' }} />
        </div>
      </Draggable>
    );           // find a way to add marked inside the dangerouslySetInnerHTML!
  }
}

export default Note;
