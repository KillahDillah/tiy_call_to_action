import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'

// This file shouldn't be modified. Use components/App.js instead

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
