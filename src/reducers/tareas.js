import { MOSTRAR_TAREAS } from '../actions'

const initialState = {
    list: []
}

export function mostrar_tareas(state = initialState, action) {
    console.log(state,"STATE");
    
    switch (action.type) {
        case MOSTRAR_TAREAS:
            return Object.assign({}, state, {list: action.payload})
        default:
            return state 
    }
    
}
