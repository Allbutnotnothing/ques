var React = require('react');
var OptionStore = require('../stores/OptionStore');
var QuesActionCreator = require('../actions/QuesActionCreator');

var OptionSection = React.createClass({
  getStateFromStore: function(){
    return {text: OptionStore.getOption(this.props.optionId).content || ''};
  },
  getInitialState: function(){
    return this.getStateFromStore();
  },
  componentDidMount: function(){
    
  },
  componentWillUnmount: function(){
    
  },
  
  render: function(){
    return(
    <li>
      <div className="row form-group">
        <div className="col-sm-8 col-sm-offset-1">
          <input value={this.state.text} onChange={this._onChange} onBlur={this._onBlur} className="form-control"/>
        </div>
        <div className="col-sm-3">
          <button onClick={this._deleteOption} className="btn btn-danger">删除选项</button>
        </div>
      </div>
    </li>
    );
  },
  
  _onChange: function(event){
    this.setState({
      text: event.target.value,
    });
  },
  _onBlur: function(event){
    QuesActionCreator.updateOption({
      id: this.props.optionId,
      content: event.target.value,
    });
  },
  _deleteOption: function(event){
    QuesActionCreator.deleteOption(this.props.optionId);
  },
});

module.exports = OptionSection;