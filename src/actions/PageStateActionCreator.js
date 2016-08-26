var QuesAppDispatcher = require('../dispatcher/QuesAppDispatcher');

module.exports = {
  changePageState: function(newPage, newQuestionaireId){
    QuesAppDispatcher.dispatch({
      type: 'changePageState',
      newPage: newPage,
      newQuestionaireId: newQuestionaireId
    });
  },
};