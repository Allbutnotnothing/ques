var React = require('react');
var PageStore = require('../stores/PageStore');
var ListSection = require('./ListSection.react');
var EditSection = require('./EditSection.react');
var VoteSection = require('../components/VoteSection.react');
var ResultSection = require('../components/ResultSection.react');
var PageStateActionCreator = require('../actions/PageStateActionCreator');

var QuesApp = React.createClass({
  getInitialState: function(){
    return PageStore.getPageState();
  },
  render: function(){
    var mainSection;
    var viewListButton =(
      <div className="text-center">
        <button className="btn btn-lg btn-link" onClick={this._backHome}>返回列表</button>
      </div>
    );
    if(this.state.currentPage === 'list'){
      mainSection=<ListSection />;
    } else if(this.state.currentPage === 'edit'){
      var id = this.state.currentQuestionaireId || 'qs_'+Date.now();
      mainSection=<EditSection questionaireId = {id} />;
    } else if(this.state.currentPage === 'vote'){
      mainSection=<VoteSection questionaireId={this.state.currentQuestionaireId} />;
    } else if(this.state.currentPage === 'result'){
      mainSection=<ResultSection questionaireId={this.state.currentQuestionaireId} />;
    }
    return(
      <div className="container">
        {mainSection}
        {this.state.currentPage === 'list'?null:viewListButton}
      </div>
    );
    
  },
  componentDidMount: function(){
    PageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    PageStore.removeChangeListener(this._onChange);
  },
  
  _onChange: function(){
    this.setState(PageStore.getPageState());
  },
  _backHome: function(){
    PageStateActionCreator.changePageState('list', '');
  },
});

module.exports = QuesApp;