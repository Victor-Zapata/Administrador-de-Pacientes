import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

 //ahora voy a crear el State de las citas 
    //lo que pongo en useState siempre depende del proyecto
    //acá será un objeto con los valores seteados como string vacio

    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    const [error, actualizarError] = useState(false)

    //ahora armo la función que se ejecuta cada vez que el usuario escribe un input
    //por lo gral se la llama 'handleChange' pero acá la llamaré 'actualizarState'

    const actualizarState = e => {
        actualizarCita({
            ...cita, //acá tomo una copia de la cita, para evitar que la reescriba
            [e.target.name]: e.target.value //uso array destructuring para escribir la info del input
        })                                 //dentro de la propiedad a la que lo quiero agregar
    }

    //Extraer los valores 
    const {mascota, propietario, fecha, hora, sintomas} = cita; //me traigo todo lo que viene de cita
    //se recomienda extraerlos para no tener que llamarlos como cita.mascota, por ej
    
    //luego llevo el value de cada uno adentro del input para más tarde poder resetarlos
    //cuando lo necesite, es decir, cuando necesite reiniciar el form

    //----//
    //cuando el usuario presione guardar cita, se ejecutará la siguiente función:

    const submitCita = e => {
        e.preventDefault();//el preventDefault previene la acción por default
        //primero que nada, debo validar
        //pongo una condición que compruebe si mascota es igual a un string vacío. El trim elimina los espacios en blanco.
        if(
        mascota.trim() === '' || 
        propietario.trim() === '' || 
        fecha.trim() === '' ||
        hora.trim() === '' ||
        sintomas.trim() === '') {
            actualizarError(true) //no uso {} como en el primer useState porque es un booleano
        }
        
        //eliminar el mensaje de error previo
        actualizarError(false);
        //luego, asigno un ID...como no tenemos base de datos, vamos a generar Id con
        //una libreria que se llama uuid


        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
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

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>     : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre  Dueño de la mascota"
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

                <label>Síntomas</label>
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