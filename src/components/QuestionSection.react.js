 var React = require('react');
 
 var OptionStore = require('../stores/OptionStore');
 var QuestionStore = require('../stores/QuestionStore');
 var OptionSection = require('./OptionSection.react');
 
 var QuesActionCreator = require('../actions/QuesActionCreator');
 
 var QuestionSection = React.createClass({
   getStateFromStore: function(){
     var options = OptionStore.getOptions(this.props.questionId);
     return {
       options: options,
       question: QuestionStore.getQuestion(this.props.questionId), //增加了删除功能后，this could be undefined
        };
   },
   getInitialState: function(){
     return this.getStateFromStore();
   },
   componentDidMount: function(){
     QuestionStore.addChangeListener(this._onChange);
     OptionStore.addChangeListener(this._onChange);
   },
   componentWillUnmount: function(){
     QuestionStore.removeChangeListener(this._onChange);
     OptionStore.removeChangeListener(this._onChange);
   },
   render: function(){
     var optionListItem = this.state.options.map(function(option){
       return <OptionSection key={option.id} optionId={option.id}/> ;
     });
     return(
      <div className={this.state.question.type}>
        <div className="row form-group">
          <div className="col-sm-9">
            <div className="input-group">
              <span className="input-group-addon">问题标题</span>
              <input id={this.props.questionId} value={this.state.question.title||""} onChange={this._updateQuestionTilte} className="form-control"/>
            </div>
          </div>
          <div className="col-sm-3">
            <button onClick={this._addOption} className="btn btn-default">添加选项</button>
            <button onClick={this._deleteQuestion} className="btn btn-danger">删除问题</button>
          </div>
        </div>
        
        
        <ul className="option-list">
          {optionListItem}
        </ul>
      </div>
     );
   },
   _onChange: function(){
     this.setState(this.getStateFromStore());
   },
   _updateQuestionTilte: function(event){
     QuesActionCreator.updateQuestion({
       id: this.props.questionId,
       title: event.target.value,
     });
   },
   _addOption: function(event){
     var id = 'o_'+Date.now();
     QuesActionCreator.updateOption({
       id:id,
       questionId:this.props.questionId,
       votes:0,
     });
   },
   _deleteQuestion: function(event){
     QuesActionCreator.deleteQuestion(this.props.questionId);
   },
 });
 
 module.exports = QuestionSection;