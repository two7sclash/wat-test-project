var _ = require('lodash'),
request = require('axios'),
ReactDOM = require('react-dom'),
React = require('react');

function isDefined(val) { return val != null; }

function randomize(data){
  ;
  var randoms = _.sampleSize(data, 5),
  theOne = _.sample(randoms);
  return {
    randoms : randoms,
    theOne : theOne
    }

}

var ToggleDisplay = React.createClass({

	propTypes: {
		hide: React.PropTypes.bool,
		show: React.PropTypes.bool
	},

	shouldHide: function() {
		var shouldHide;
		if(isDefined(this.props.show)) {
			shouldHide = !this.props.show;
		}
		else if(isDefined(this.props.hide)) {
			shouldHide = this.props.hide;
		}
		else {
			shouldHide = false;
		}

		return shouldHide;
	},

	render: function() {
		let style = {};

		if(this.shouldHide()) {
			style.display = 'none';
		}

		return (
			<span style={style} {...this.props} />
		);
	}

});

var NameGame = React.createClass({
  getInitialState: function() {
    return {
      randoms: [],
      theOne: ""
    }
  },

  toggleHighlight: function(i) {
      var newPeople = this.state.randoms;
      newPeople[i].highlighted = !newPeople[i].highlighted
      this.setState({ randoms: newPeople });

      debugger;

      if (newPeople[i].name === this.state.theOne.name)
      {

        setTimeout(() => {
          _.filter(this.state.randoms, {highlighted: true}).map(function(item){
            item.highlighted = false;
          })
          init()
        }, 2000);
      }
    },

  componentDidMount: function() {
    this.serverRequest =
    request.get(this.props.source)
        .then((response) => {
          _.each(response.data, function(element) {
	           element.highlighted = false;
          });
          this.cache = response.data;
          //
          let state = randomize(this.cache);
          ;
            this.setState(state)
        })
    },

    componentWillReceiveProps: function() {

      let state = randomize(this.cache);
      this.setState(state)
    },

    componentWillUnmount: function() {
      this.serverRequest.abort();
    },

    render: function() {

      return (
        <div>
          <h1>Who is {this.state.theOne.name}?</h1>
          {

            this.state.randoms.map(function(person, index){
              //
              var classNameRejoinder = this.state.theOne.name === person.name ? 'right' : 'wrong';
              //var classNameVisible = {this.state.isHidden ? "hidden" :""}
              // change state in specific NOTE
              return (

                <article key={index} className="person" onClick={this.toggleHighlight.bind(null, index)}>
                  <img src={person.url} />
                  <ToggleDisplay className={"name " + classNameRejoinder} show={person.highlighted}>
                    {person.name}
                  </ToggleDisplay>
                </article>
              );
            }, this)}
        </div>
      )
    }
  });

var init = (function f() {
  ReactDOM.render(<NameGame source="http://api.namegame.willowtreemobile.com/" />, document.getElementById("namegame")); return f; })()
