var React = require('react');

var QuestionSection = require('./QuestionSection.react');
var QuestionaireStore = require('../stores/QuestionaireStore');
var QuestionStore = require('../stores/QuestionStore');
var OptionStore = require('../stores/OptionStore');

var QuesActionCreator = require('../actions/QuesActionCreator');

var EditSection = React.createClass({
  getStateFromStores: function(){
    var questionaire = QuestionaireStore.get(this.props.questionaireId);
    var title='';
    var questions=[];
    if(questionaire){
      title = questionaire.title;
      questions = QuestionStore.getQuestions(this.props.questionaireId);
    }
    return {
      title: title,
      questions: questions
    };
  },
  
  getInitialState: function(){
    return this.getStateFromStores();
  },
  componentDidMount: function(){
    QuestionaireStore.addChangeListener(this._onChange);
    QuestionStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    QuestionaireStore.removeChangeListener(this._onChange);
    QuestionStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var questionsList = this.state.questions.map(function(question){
      return <QuestionSection key={question.id} questionId={question.id} />;
    });
    return (
      <div className="edit_section">
        <div className="input-group input-group-lg form-group">
          <span className="input-group-addon">问卷标题</span>
          <input className="form-control" value={this.state.title} onChange={this._onTitleChange} onBlur={this._onBlur}/>
        </div>
        <div className="form-group">
          <button disabled={!this.state.title} onClick={this._addSingleQuestion} className="btn btn-primary">添加单选题</button>
        </div>
        {questionsList}
      </div>
    );
  },
  
  _onChange: function(){
    this.setState(this.getStateFromStores());
  },
  _onTitleChange: function(event){
    this.setState({title: event.target.value});
  },
  _onBlur: function(event){
    //console.log('blurred!');
    var id = this.props.questionaireId;
    QuesActionCreator.updateQuestionaire(id, event.target.value);
  },
  _addSingleQuestion: function(event){
    QuesActionCreator.updateQuestion({
      id: 'q_'+ Date.now(),
      type:'single',
      questionaireId: this.props.questionaireId,
    });
  },
});

module.exports = EditSection;