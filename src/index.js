var ReactDOM = require('react-dom');

var React = require('react');
window.React = React;

var QuesApp = require('./components/QuesApp.react');
ReactDOM.render(
    <QuesApp />,
    document.getElementById('app')
);