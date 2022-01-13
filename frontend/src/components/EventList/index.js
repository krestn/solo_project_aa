import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditEventForm from '../EditEventForm'
import RSVPForm from '../RSVPForm'
import { deleteEvent, getEvents } from '../../store/event'
import './EventList.css'

// 10. import packages, hooks, and the matching function from the store
const EventList = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    // 11. state is passed in w/ dispatch above. accessed by useSelector below.
    // use console.log to see objKeys. events = array of all events.
    let events = useSelector(state => {
        return state.event.list
    })

    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormId, setEditFormId] = useState(null)
    const [showRSVPForm, setShowRSVPForm] = useState(false)
    // console.log('events', events)

    // 12. useEffect to dispatch the matching function from store to get needed data
    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch]) // adding events causes infinite loop

    // if no sessionUser = not logged in
    if (!sessionUser) return null

    // 13. render data in jsx below.
    return (
        <>

            <div className='event-area'>
                <h2 className='events-header'>Upcoming Events</h2>
                <div className='events-container'>
                    <ul className='events-list'>
                        {events.map(event => (
                            <div key={`eventDiv-${event.id}`} className='individual-events'>
                                <li className='list' key={event.id}>
                                    <h3 className='event-title' key={event.name}>{event.name}</h3>
                                    <p className='event-text' key={event.details}>What: {event.details}</p>
                                    <p className='event-text' key={event.location}>Where: {event.location}</p>
                                    <p className='event-text' key={event.createdAt}>When: {event.date} {event.time}</p>
                                    {/* <div className='event-text' key={event.date}>{event.date}</div>
                                    <div className='event-text' key={event.time}>{event.time}</div> */}
                                </li>
                                { (sessionUser.id === event.hostId) &&
                                    <button key={`eventEdit-${event.id}`}
                                            className='form-button'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowEditForm(!showEditForm)
                                                setEditFormId(event.id)
                                                }
                                            }
                                    >
                                        Edit
                                    </button> }
                                { (sessionUser.id === event.hostId) &&
                                    <button key={`deleteEdit-${event.id}`}
                                            className='form-button'
                                            onClick={() => dispatch(deleteEvent(event.id))}
                                            // className={ event.id }
                                    >
                                        Cancel Event
                                    </button> }
                                { (sessionUser.id !== event.hostId) &&
                                    <button key={`eventRSVP-${event.id}`}
                                            className='form-button'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowRSVPForm(!showRSVPForm)
                                                setEditFormId(event.id)
                                                }
                                            }
                                    >
                                        Show RSVPs
                                    </button> }
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            { showEditForm &&
                <EditEventForm
                eventId={editFormId}
                setShowEditForm={setShowEditForm}
                setEditFormId={setEditFormId}
                />
            }
            { showRSVPForm &&
                <RSVPForm
                    eventId={editFormId}
                    setShowRSVPForm={setShowRSVPForm}
                />
            }
        </>
    )
}

export default EventList
