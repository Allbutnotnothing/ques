var _questionaires = {};
var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
function _updateQuestionaire(id, newTitle){
  _questionaires[id] = _questionaires[id] || {};
  if(!_questionaires[id].state){
    _questionaires[id].state = 'before_launch';
  }
  _questionaires[id].title = newTitle;
  _questionaires[id].id = id;
}
var QuestionaireStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  get: function(id){
    return _questionaires[id];
  },
  getAll: function(){
    var questionaires = [];
    for(var id in _questionaires){
      questionaires.push(_questionaires[id]);
    }
    return questionaires;
  },
});

QuestionaireStore.dispatchToken = QuesAppDispatcher.register(function(action){
  switch(action.type){
    case 'updateQuestionaire': //add or modify a questionaire
      _updateQuestionaire(action.id, action.title);
      QuestionaireStore.emitChange();
      break;
    case 'deleteQuestionaire':
      delete _questionaires[action.questionaireId];
      QuestionaireStore.emitChange();
      break;
    case 'launchQuestionaire':
      _questionaires[action.id].state='active';
      QuestionaireStore.emitChange();
      break;
  }
});

module.exports = QuestionaireStore;