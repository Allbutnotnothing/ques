var React = require('react');
var QuesActionCreator = require('../actions/QuesActionCreator');
var RadioInput = React.createClass({
  render: function(){
    var option = this.props.option;
    return (
      <label htmlFor={option.id}>
        <input type='radio' onChange={this._selectChange} name={option.questionId} value={option.id} />
        {option.content}
      </label>
    );
  },
  
  _selectChange: function(event){
    console.log('i run'); //it won't run for checked>unchecked, but will run for checked>checked!
    QuesActionCreator.selectOption(event.target.value, event.target.checked);
  },
});

module.exports = RadioInput;