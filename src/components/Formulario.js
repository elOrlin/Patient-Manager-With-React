import React, {Fragment, useState} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types'

const Formulario = ({crearCitas}) => {

    //Crear state de Citas
   const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
   })

    const [error, actualizarError] = useState(false)

    //actualizar estado 
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
         || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }

        //eliminar el mensaje previo
        setTimeout(() => {
            actualizarError(false);
        }, 3000);

        //asignar un id
        cita.id = shortid.generate();

        //crear la cita
        crearCitas(cita);
        
        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre propietario"
                    onChange={actualizarState}
                    value={propietario}
                />
                
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;