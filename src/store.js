import { createStore } from "redux"

const initialState = {
    tareas: []
}

const reducer = (state = initialState, action) => {

    if (action.type === "AGREGAR_TAREA") {
        console.log(action,"AGREGAR TAREA REDUCER");
        return {
            ...state,
            // titulares: state.titulares.concat(action.jugador),
            // jugadores: state.jugadores.filter(j => j.id !== action.jugador.id)
        }
    }

    if ( action.type === "QUITAR_TITULAR") {
        
        return {
            ...state,
            titulares: state.titulares.filter(j => j.id !== action.jugador.id),
            jugadores: state.jugadores.concat(action.jugador)
        }
    }

    return state
}

export default createStore(reducer)
