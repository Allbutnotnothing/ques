var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');

module.exports = {
  updateQuestionaire: function(id,title){
    QuesAppDispatcher.dispatch({
      type: 'updateQuestionaire',
      id: id,
      title: title
    });
  },
  launchQuestionaire: function(id){
    QuesAppDispatcher.dispatch({
      type: 'launchQuestionaire',
      id: id,
    });
  },
  updateQuestion: function(newQuestion){
    QuesAppDispatcher.dispatch({
      type: 'updateQuestion',
      newQuestion: newQuestion,
    });
  },
  updateOption: function(newOption){
    QuesAppDispatcher.dispatch({
      type: 'updateOption',
      newOption: newOption,
    });
  },
  
  deleteQuestionaire: function(questionaireId){//先删OptionStore,再删QuestionaireStore和QuestionStore.
    QuesAppDispatcher.dispatch({
      type:'deleteQuestionaire_ForOptionStore',
      questionaireId:questionaireId,
    });
    QuesAppDispatcher.dispatch({
      type:'deleteQuestionaire',
      questionaireId:questionaireId,
    });
  },
  deleteQuestion: function(questionId){
    QuesAppDispatcher.dispatch({
      type:'deleteQuestion',
      questionId: questionId,
    });
  },
  deleteOption: function(optionId){
    QuesAppDispatcher.dispatch({
      type: 'deleteOption',
      optionId: optionId,
    });
  },
  swapSelectOption: function(selectedOptionId, unselectedOptionId){
    QuesAppDispatcher.dispatch({
      type: 'swapSelectOption',
      selectedOptionId: selectedOptionId,
      unselectedOptionId: unselectedOptionId,
    });
  },
};