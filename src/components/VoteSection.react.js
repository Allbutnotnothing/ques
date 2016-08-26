var React = require('react');
var QuestionaireStore = require('../stores/QuestionaireStore');
var QuestionStore = require('../stores/QuestionStore');
var OptionStore = require('../stores/OptionStore');
//var PageStore = require('../stores/PageStore');
//var PageStateActionCreator = require('../actions/PageStateActionCreator');
var SingleTypeQuestion = require('../components/SingleTypeQuestion.react');

var VoteSection = React.createClass({
  render: function(){
    var questions = QuestionStore.getQuestions(this.props.questionaireId);
    var questionaire = QuestionaireStore.get(this.props.questionaireId);
    var questionListItems = questions.map(function(question){
      if(question.type === 'single'){
        var options = OptionStore.getOptions(question.id);
        return <SingleTypeQuestion key={question.id} question={question} options={options}/>
      }
    });
    return (
      <div>
        <form>
          <h2>{questionaire.title}</h2>
          <div>
            {questionListItems}
          </div>
        </form>
      </div>
    );
  },
  
});

module.exports = VoteSection;