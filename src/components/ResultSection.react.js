var React = require('react');
var QuestionaireStore = require('../stores/QuestionaireStore');
var QuestionStore = require('../stores/QuestionStore');
var OptionStore = require('../stores/OptionStore');
var ResultSection = React.createClass({
  render: function(){
    var questionaire = QuestionaireStore.get(this.props.questionaireId);
    var questions = QuestionStore.getQuestions(this.props.questionaireId);
    
    var questionItems = questions.map(function(question){
      var options = OptionStore.getOptions(question.id);
      var overallVotes = options.reduce((sum,option)=>sum+option.votes,0);
      var optionItems = null;
      if (overallVotes !== 0){
        var colorClasses=['progress-bar-warning', 'progress-bar-success', 'progress-bar-info', 'progress-bar-danger'];
        var optionItems = options.map(function(option, index){
          var percentage = option.votes / overallVotes * 100;
          var colorClass = colorClasses[index%options.length];
          return(
            <div className={"progress-bar "+colorClass} key={option.id} style={{width: percentage+'%'}} title={option.content}>
            </div>
          );
        });
      }
      return(
        <div key={question.id}>
          <h3>{question.title}</h3>
          <h4 className="text-muted">Overall votes:{overallVotes}</h4>
          
          <div className="progress">
            {optionItems}
          </div>
        </div>
      );
    });
    
    return(
      <div className="jumbotron">
        <h2 className="text-center">{questionaire.title}</h2>
        {questionItems}
      </div>
    );
    
    
  },
});

module.exports = ResultSection;