import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editEvent } from '../../store/event'
import './EditEventForm.css'

const EditEventForm = ({ eventId, setShowEditForm, setEditFormId }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector(state => {
        return state.event
    })
    const history = useHistory()
    const [hostId, setHostId] = useState(0)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [details, setDetails] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [errors, setErrors] = useState([])


    const event = useSelector(state => {
        const eventArray = state.event.list
        for (let i = 0; i < eventArray.length; i++) {
            if (eventArray[i].id === eventId) {
                return eventArray[i]
            }
        }
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const updatedEvent = {
            ...event,
            name: name,
            details: details
        }
        return dispatch(editEvent(updatedEvent)).then(() => setShowEditForm(false)).then(() => setEditFormId(null))
            .catch(
                async(res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                }
            )
    }

    return (
        <section className='editor-area'>
            <h2 className='edit-header'>Edit Event</h2>
            <ul className='ul-errors'>
                {errors && errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
            </ul>
            <form className='edit-form' onSubmit={ handleSubmit }>
                <input
                    className='create-form-input'
                    type='name'
                    placeholder='Event Name'
                    required
                    value={ name }
                    onChange={(e) => setName(e.target.value)} />
                {/* <input
                    type='location'
                    placeholder='Event Location'
                    required
                    value={ location }
                    onChange={(e) => setLocation(e.target.value)} /> */}
                <input
                    className='create-form-input'
                    type='text'
                    placeholder='New Details'
                    required
                    value={ details }
                    onChange={(e) => setDetails(e.target.value)} />
                {/* <input
                    type='date'
                    placeholder='Event Date'
                    required
                    value={ date }
                    onChange={(e) => setDate(e.target.value)} />
                <input
                    type='time'
                    placeholder='Event Time'
                    required
                    value={ time }
                    onChange={(e) => setTime(e.target.value)} /> */}
                <button className='form-edit-save'>Save</button>
                {/* <button className='hide-form'>Close</button> */}
            </form>
        </section>
    )
}

export default EditEventForm
