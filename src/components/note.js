import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: props.note.title,
      x: props.note.x,
      y: props.note.y,
      zIndex: props.note.zIndex,
      content: props.note.content,
      isEditing: false,
    };
  }

  renderSomeSection() {
    if (this.state.isEditing) {
      return <div>editing!</div>;
    } else {
      return <div><Textarea>{this.state.content}</Textarea></div>;
    }
  }
  render() {
    const statex = this.state.x;
    const statey = this.state.y;
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
            {this.state.title}
            <i onClick={this.onDeleteClick} className="fa fa-trash-o" />
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={this.renderSomeSection()} />
        </div>
      </Draggable>
    );
  }
}

export default Note;
