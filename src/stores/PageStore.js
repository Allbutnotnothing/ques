var _pageState = {
  currentPage: 'list',
  currentQuestionaireId: '',
};
var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
//var PAGE_CHANGE_EVENT = 'page_change';
//var QUESTIONAIRE_CHANGE_EVENT = 'questionaire_change';
var CHANGE_EVENT = 'change';
function setPageState(newPage, newQuestionaireId){
  _pageState = {
    currentPage: newPage,
    currentQuestionaireId: newQuestionaireId,
  };
}
var PageStore = assign({}, EventEmitter.prototype,{
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getPageState: function(){
    return _pageState;
  },
});

PageStore.dispatchToken = QuesAppDispatcher.register(function(action){
  switch(action.type){
    case 'changePageState':
      setPageState(action.newPage, action.newQuestionaireId);
      PageStore.emitChange();
      break;
  }
});

module.exports = PageStore;