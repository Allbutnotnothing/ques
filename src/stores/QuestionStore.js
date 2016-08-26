var _questions = {};

var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
//var QuestionaireStore = require('./QuestionaireStore');
//var OptionStore = require('../stores/OptionStore');--避免两者的 circular require!
var QuestionStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getQuestions: function(questionaireId){
    var questions = [];
    for (var id in _questions){
      if(_questions[id].questionaireId === questionaireId){
        questions.push(_questions[id]);
      }
    }
    return questions;
  },
  getQuestion: function(questionId){
    return _questions[questionId];
  },
});

QuestionStore.dispatchToken = QuesAppDispatcher.register(function(action){
  switch(action.type){
    case 'deleteQuestionaire':
      //console.log('I run second?');
      for(var id in _questions){
        if(_questions[id].questionaireId === action.questionaireId){
          delete _questions[id];
        }
      }
      QuestionStore.emitChange();
      break;
    case 'updateQuestion':
      updateQuestion(action.newQuestion);
      QuestionStore.emitChange();
      break;
    case 'deleteQuestion':
      //console.log('q');
      delete _questions[action.questionId];
      QuestionStore.emitChange();
      break;
  }
});
function updateQuestion(newQuestion){
  var id = newQuestion.id;
  _questions[id] = _questions[id] || {};
  assign(_questions[id], newQuestion);
}
module.exports = QuestionStore;