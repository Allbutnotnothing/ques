var React = require('react');
var PageStateActionCreator = require('../actions/PageStateActionCreator');
var QuesActionCreator = require('../actions/QuesActionCreator');
var QuestionaireStore = require('../stores/QuestionaireStore');

var QuestionaireListItem = React.createClass({
  componentDidMount: function(){
    QuestionaireStore.addChangeListener(this._onQuestionaireChange);
  },
  componentWillUnmount: function(){
    QuestionaireStore.removeChangeListener(this._onQuestionaireChange);
  },
  render: function(){
    //console.log(this.props.questionaireId);
    var questionaire = QuestionaireStore.get(this.props.questionaireId);
    var editButton = questionaire.state==='before_launch'?(<button className="btn btn-default" onClick={this._editingPage}>编辑</button>):null;
    var voteButton = questionaire.state==='active'?(<button className="btn btn-default" onClick={this._votePage}>投票</button>):null;
    var launchButton = questionaire.state==='before_launch'?(<button className="btn btn-default" onClick={this._launchQuestionaire}>接受投票</button>):null;
    var viewResultButton = questionaire.state==='active'?(<button className="btn btn-default" onClick={this._viewResultPage}>查看结果</button>):null;
    return (
      <tr>
        <td>
          {questionaire.title}
        </td>
        <td>
          <div className="btn-group">
            {editButton}
            {launchButton}
            {voteButton}
            {viewResultButton}
            <button className="btn btn-danger" data-toggle="modal" data-target={'#'+this.props.questionaireId}>删除</button>
            
          </div>
        </td>
        
        <td>
          <div className="modal" id={this.props.questionaireId}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button className="close" data-dismiss="modal"><span>&times;</span></button>
                  <h4 className="modal-title text-center">
                    确认删除问卷 {questionaire.title} ？
                  </h4>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={this._confirmDeleteQuestionaire}>确认删除</button>
                  <button className="btn btn-default" data-dismiss="modal">取消</button>
                </div>
              </div>
            </div>
          </div>
        </td>
        
      </tr>
    );
  },
  _editingPage: function(event){
    var id = this.props.questionaireId;
    PageStateActionCreator.changePageState('edit', id);
  },
  _votePage: function(event){
    var id = this.props.questionaireId;
    PageStateActionCreator.changePageState('vote', id);
  },
  _confirmDeleteQuestionaire: function(event){
    QuesActionCreator.deleteQuestionaire(this.props.questionaireId);
    $('#'+this.props.questionaireId).modal('hide');
  },
  _launchQuestionaire: function(event){
    QuesActionCreator.launchQuestionaire(this.props.questionaireId);
  },
  _onQuestionaireChange: function(){
    this.forceUpdate();
  },
  _viewResultPage: function(event){
    var id = this.props.questionaireId;
    PageStateActionCreator.changePageState('result', id);
  },
});

module.exports = QuestionaireListItem;