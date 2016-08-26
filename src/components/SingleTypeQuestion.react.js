var React = require('react');
var QuesActionCreator = require('../actions/QuesActionCreator');
//var RadioInput = require('../components/RadioInput.react');
var SingleTypeQuestion = React.createClass({
  getInitialState: function(){
    return {checkedOptionId: this.props.options[0].id};
  },
  render: function(){
    var options = this.props.options;
    var radioInputs = options.map((function(option){
      return (
        <div className="radio" key={option.id}>
          <label htmlFor={option.id}>
            <input type='radio' id={option.id} onChange={this._checkedChange} name={option.questionId} value={option.id} checked={option.id === this.state.checkedOptionId}/>
            {option.content}
          </label>
        </div>
      );
    }).bind(this));
    return (
      <div>
        <h3>{this.props.question.title}</h3>
        {radioInputs}
      </div>
    );
  },
  componentDidMount: function(){
    //console.log('i run');
    QuesActionCreator.swapSelectOption(this.state.checkedOptionId, null);
  },
  componentDidUpdate: function(prevProps, prevState){
    //console.log(prevState.checkedOptionId);
    QuesActionCreator.swapSelectOption(this.state.checkedOptionId, prevState.checkedOptionId);
  },
  _checkedChange: function(event){
    //console.log('i run'); // run everytime a radio button is clicked!
    this.setState({checkedOptionId: event.target.value});
  },
});

module.exports = SingleTypeQuestion;