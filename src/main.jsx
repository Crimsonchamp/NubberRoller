import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


//For the styles
import './index.css'

import App from './App.jsx'


//createRoot initializes React rendering, where in the html to put it, it's 
//.render is the method to start rendering it into the DOM
//The DOM(Document Object Model) is a representation of the objects and nodes of the document.

createRoot(document.getElementById('root')).render(
  //Strict mode seems to just be something of a guidance system that gives heads ups and warnings.
  //It's a wrapper provided by react
  //App is the main component of the app, the App.jsx
  <StrictMode>
    <App />
  </StrictMode>,
)
