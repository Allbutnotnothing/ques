var React = require('react');
var QuestionaireStore = require('../stores/QuestionaireStore');
var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');
var PageStateActionCreator = require('../actions/PageStateActionCreator');
var QuestionaireListItem = require('./QuestionaireListItem.react');
function getStateFromStores(){
  return {
    questionaires:QuestionaireStore.getAll(),
  };
}
var ListSection = React.createClass({
  _editingPage: function(event){  //注意第一个parameter一定是event
    var id = '';
    PageStateActionCreator.changePageState('edit', id);
  },
  getInitialState: function(){
    return getStateFromStores();
  },
  componentDidMount: function(){
    QuestionaireStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    QuestionaireStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var listItems = this.state.questionaires.map(function(questionaire){
      return <QuestionaireListItem key={questionaire.id} questionaireId={questionaire.id} />
    });
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>标题</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick = {this._editingPage}>新增问卷</button>
      </div>
    );
  },
  _onChange: function(){
    this.setState(getStateFromStores());
  },
  
});

module.exports = ListSection;