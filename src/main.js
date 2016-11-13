var _ = require('lodash'),
request = require('axios'),
ReactDOM = require('react-dom'),
React = require('react');

var NameGame = React.createClass({

  getInitialState: function() {
    return {
      people: []
    }
  },

  componentDidMount: function() {
    this.serverRequest =
    request.get(this.props.source)
        .then((response) => {
          var randoms = _.sampleSize(response.data, 5),
          theOne = _.sample(randoms);
            this.setState({
            people: randoms,
            selected: theOne.name
          })
        })
    },


    componentWillUnmount: function() {
    this.serverRequest.abort();
    },

    render: function() {

      return (
        <div>
          <h1>Who is {this.state.selected}?</h1>
          {
            this.state.people.map(function(person, index){
              var classNameExt = this.state.selected === person.name ? 'right' : 'wrong';

              return (
                <article key={index} className="person">
                  <img src={person.url}  />
                  <span className={"name hidden " + classNameExt}>
                    <h2>{person.name}</h2>
                  </span>
                </article>
              );
            }, this)}
        </div>
      )
    }
  });

ReactDOM.render(<NameGame source="http://api.namegame.willowtreemobile.com/" />, document.getElementById("namegame"));
