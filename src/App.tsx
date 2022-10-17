import React from 'react';
import './App.css';
import ChakraStyleProvider from './provider/ui/ChakraStyleProvider';
import RouterConfig from './router/RouterConfig';

const App = () => (
  <div className="App">
    <ChakraStyleProvider>
      <RouterConfig />
    </ChakraStyleProvider>
  </div>
);

export default App;
