import { Button, Form, Grid, Header, Image, Message, Segment, Table, Checkbox, Confirm, MessageContent } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios';
import React from 'react'



export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: [],
            nombreTarea: "",
            objetoTarea: {},
            tareaSeleccionada: {},
            open: false,
            arrayChekeados: [],
            mensajeBorrados: false,
            mensajesSeleccionados: false,
            campoVacio: false,
            confirmEstatus:false        
        };

    }

    componentDidMount() {
        this.obtenerTareas()
    }

    // `/departamentos/plantillatickets/${idDepartamento}`

    obtenerTareas = () => {
        axios.get('http://localhost:3000/tarea/', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            this.setState({ tareas: response.data.tareas });
        })
    }

    agregarTarea = () => {
        if (this.state.nombreTarea === "") {

            this.setState({
                campoVacio: true
            });
            return 0
        }
        let param = { nombre: this.state.nombreTarea }
        if (this.state.tareaSeleccionada._id != undefined) {

            param = { nombre: this.state.nombreTarea }

            axios.put(`http://localhost:3000/tarea/${this.state.tareaSeleccionada._id}`, param).then((response) => {
                console.log(response, "Editado");
                this.obtenerTareas()
            })
        } else {
            axios.post('http://localhost:3000/tarea/', param).then((response) => {
                console.log(response, "Creado");
            })
        }

        this.obtenerTareas()

        this.setState({
            nombreTarea: '',
            tareaSeleccionada: {},
        });

    }

    onChangeTextSearch = (event) => {

        this.setState({
            nombreTarea: event.target.value,
            campoVacio: false
        })
    }

    editarTarea = (tarea) => {

        this.setState({
            nombreTarea: tarea.nombre,
            tareaSeleccionada: tarea,
        })
        console.log(tarea, "tarea");
    }

    borrarTarea = (tarea) => {

        this.setState({
            open: true,
            nombreTarea: tarea.nombre,
            tareaSeleccionada: tarea,
        })
        console.log(tarea, "tarea");
    }

    cambiarEstatusTarea = (tarea) => {this.setState({ confirmEstatus: true, tareaSeleccionada : tarea })}

    aceptarEstatus = () => {
        let param = { estatus: false}
            
        axios.put(`http://localhost:3000/tarea/${this.state.tareaSeleccionada._id}`, param).then((response) => {
            console.log(response, "Editado");
            this.obtenerTareas()
        })

        this.setState({ confirmEstatus: false, tareaSeleccionada : {} })
    }

    show = () => {
        
        if (this.state.arrayChekeados.length > 0) {
            this.setState({ open: true })
        }else{
            this.setState({ mensajesSeleccionados: true })
        }
        
    }

    handleConfirm = () => {

        let tareaSeleccionadas = []
        if (this.state.tareaSeleccionada._id != undefined) {
            tareaSeleccionadas.push(this.state.tareaSeleccionada)
        } else {
            tareaSeleccionadas = this.state.arrayChekeados
        }

        if (tareaSeleccionadas.length > 0) {
            tareaSeleccionadas.forEach(tarea => {

                axios.delete(`http://localhost:3000/tarea/${tarea._id}`).then((response) => {
                    console.log(response, "Borrado");
                    this.obtenerTareas()
                })
            });
        } else {
            this.setState({
                open: false,
                nombreTarea: '',
                tareaSeleccionada: {},
                arrayChekeados: [],
            })
        }

        this.setState({
            open: false,
            nombreTarea: '',
            tareaSeleccionada: {},
            arrayChekeados: [],
        })

    }

    handleCancel = () => this.setState({ open: false })

    handleDismiss = () => {
        this.setState({ mensajesSeleccionados: false, confirmEstatus:false})

    }


    tareaCheck = (tarea, index) => (event, event2) => {

        const checked = event2.checked
        const currentArray = this.state.arrayChekeados

        if (checked) {
            currentArray.push(tarea)
        } else {
            currentArray.splice(index, 1)
        }

        this.setState({
            arrayChekeados: currentArray,
            mensajesSeleccionados: false
        })

    }



    render() {
        console.log(this.state, "EL ESTADO");

        return (
            <div className="App">
                {this.state.campoVacio ?
                    <Message positive>
                        <Message.Header>Campo vacio</Message.Header>
                        <p>
                            Es necesario escribir en la caja de texto.
                    </p>
                    </Message>
                    : null}
                {this.state.mensajesSeleccionados ?
                    <Message negative
                        onDismiss={this.handleDismiss}>
                        <Message.Header>Error</Message.Header>
                        <p>Es necesario seleccionar una tarea</p>
                    </Message>
                    : null}

                <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 800 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {/* <Image src='/logo.png' />  */}
                            To do list - prueba
                    </Header>
                        <Form size='small'>
                            <Segment stacked>
                                <Form.Input fluid icon='tasks' iconPosition='left' placeholder='Escribir tarea' value={this.state.nombreTarea} onChange={this.onChangeTextSearch} />
                                <Button color='teal' fluid size='large' onClick={this.agregarTarea} >
                                    Agregar tarea
                        {/* onClick={() => agregarTarea()} */}
                                </Button>
                            </Segment>
                        </Form>

                        <Grid textAlign='center' style={{ height: '10vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 800 }}>
                                <Form size='large'>
                                    <Segment stacked>
                                        <Button color='red' fluid size='large' onClick={this.show} >
                                            Borrar tarea seleccionada
                    {/* onClick={() => agregarTarea()} */}
                                        </Button>
                                    </Segment>
                                </Form>

                            </Grid.Column>
                        </Grid>

                        <Table compact celled definition>
                            <Table.Body>
                                {this.state.tareas.map((tarea, key) => {
                                    return (
                                        <Table.Row key={key}>
                                            <Table.Cell>{tarea.nombre}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <div class="ui grid " >
                                                    <div class="doubling eight column row">
                                                        <div class="column eight wide " ></div>
                                                        <div class="column ">
                                                            {tarea.estatus ?
                                                                <button class="ui icon button small red" onClick={() => this.borrarTarea(tarea)}>
                                                                    <i class="trash icon"></i>
                                                                </button> : null}
                                                        </div>
                                                        <div class="column ">
                                                            {tarea.estatus ?
                                                                <button class="ui icon button small yellow" onClick={() => this.editarTarea(tarea)}>
                                                                    <i class="edit icon"></i>
                                                                </button>
                                                                : null}
                                                        </div>
                                                        <div class="column "><button class="ui icon button small green" on onClick={() => this.cambiarEstatusTarea(tarea)} >
                                                            <i class="check icon"></i>
                                                        </button>
                                                        </div>
                                                        <div class="column  " >
                                                            <Checkbox className="checkboxPerron" onChange={this.tareaCheck(tarea, key)} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>

                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>

                <Confirm
                    open={this.state.open}
                    cancelButton='Cancelar'
                    confirmButton="Aceptar"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    onDismiss={this.handleDismiss}
                    content='¿Esta seguro que desea borrar las tareas seleccionadas?'
                />

                <Confirm
                    open={this.state.confirmEstatus}
                    cancelButton='Cancelar'
                    confirmButton="Aceptar"
                    onCancel={this.handleDismiss}
                    onConfirm={this.aceptarEstatus}
                    onDismiss={this.handleDismiss}
                    content='¿Cambiar estatus de tarea?'
                />


            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state, "state---------------");
    return {
        tareas: state
    }
}

const mapDispatchToProps = dispatch => ({
  

})


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)