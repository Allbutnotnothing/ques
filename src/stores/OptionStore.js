var _options = {};
var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var QuestionStore = require('./QuestionStore');
function updateOption(newOption){
  _options[newOption.id] = newOption;
}
var OptionStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getOptions: function(questionId){
    var options = [];
    for (var id in _options){
      if(_options[id].questionId === questionId){
        options.push(_options[id]);
      }
    }
    return options;
  },
  getOption: function(optionId){
    return _options[optionId];
  },
});

OptionStore.dispatchToken = QuesAppDispatcher.register(function(action){
  switch(action.type){
    case 'deleteQuestionaire_ForOptionStore':
      //console.log('I run first?');
      var questions = QuestionStore.getQuestions(action.questionaireId);
      questions.forEach(function(question){
        for(var id in _options){
          if(_options[id].questionId === question.id){ //question.id, not Id. ====, not =
            //console.log('i run');
            delete _options[id];
          }
        }
      });
      OptionStore.emitChange();
      break;
    case 'updateOption':
      _options[action.newOption.id] = _options[action.newOption.id] || {};
      assign(_options[action.newOption.id], action.newOption);
      OptionStore.emitChange();
      break;
    case 'deleteOption':
      delete _options[action.optionId];
      OptionStore.emitChange();
      break;
    case 'deleteQuestion':
      for(var id in _options){
        if(_options[id].questionId === action.questionId){
          delete _options[id];
          //console.log('o');
        }
      }
      OptionStore.emitChange();
      break;
    case 'swapSelectOption':
      _options[action.selectedOptionId].votes +=1;
      if(action.unselectedOptionId){
        _options[action.unselectedOptionId].votes -=1;
      }
      //console.log(_options[action.selectedOptionId].votes);
      break;
  }
});
module.exports = OptionStore;