import React from 'react';
import { Provider } from "react-redux"
import store from "./store"
import TodoList from './components/TodoList';
import "./styles/styles.scss"

const App = () => (
  <Provider store={store}>
    <main>
      <h1>EDmanager</h1>
      <TodoList />
    </main>
  </Provider>
)

export default App;
