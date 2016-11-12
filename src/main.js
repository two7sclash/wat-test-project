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
    var _this = this;
    this.serverRequest =
    request.get(this.props.source)
        .then(function (response) {
          _this.setState({
            people: response.data
          })
        })
    },

    componentWillUnmount: function() {
    this.serverRequest.abort();
    },

    render: function() {
      return (
        <article>
          {this.state.people.map(function(person, index) {
            return (
              <div key={index} className="person">
                <img src={person.url} />
                <span class="name hidden">
                  <h2>{person.name}</h2>
                </span>
              </div>
            );
          })}
        </article>
      )
    }
  });

ReactDOM.render(<NameGame source="http://api.namegame.willowtreemobile.com/" />, document.getElementById("namegame"));
