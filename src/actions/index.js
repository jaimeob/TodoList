import axios from 'axios'

export const MOSTRAR_TAREAS = 'MOSTRAR_TAREAS'

export function mostrar_tareas() {
    
    return (dispatch, getState) => {
        axios.get('http://localhost:3000/tarea/')
            .then((response) => {
                console.log(response,"response ---------------");
                dispatch( { type: MOSTRAR_TAREAS, payload: response.data } ) 
            }) 
    }
    
} 

