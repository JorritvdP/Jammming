import React from 'react';
/*import ReactDOM from 'react-dom';*/
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Components/App/App'; 


const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode>
    <App />
    </React.StrictMode>);

/*ReactDOM.render(<React.StrictMode>
    <App />
    </React.StrictMode>,
    document.getElementById('root')
    );*/