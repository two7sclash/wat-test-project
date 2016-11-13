var PeoplesList = React.createClass({
    render: function () {
        var notes = this.props.notepad.notes;

        return (
            <div className="note-list">
              {
                notes.map(function (note) {
                  return (
                    <PeopleBox key={note.id} note={note}/>
                        );
                    })
                }
            </div>
        );
    }
});
