import { combineReducers } from 'redux';
import { mostrar_tareas } from './tareas'

const rootReducer = combineReducers({
  tarea: mostrar_tareas
});

export default rootReducer;
