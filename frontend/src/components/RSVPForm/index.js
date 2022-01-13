import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readAttendees } from '../../store/rsvp'
import { addRSVP, removeRSVP } from '../../store/rsvp'
import './RSVPForm.css'

const RSVPForm = ({ eventId, setShowRSVPForm }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => {
        // console.log('state', state)
        const eventArray = state.event.list
        // console.log('eventArray', eventArray)
        for (let i = 0; i < eventArray.length; i++) {
            if (eventArray[i].id === eventId) {
                return eventArray[i]
            }
        }
    })
    // console.log('event', event)

    // sessionUser.username = username of user
    const username = sessionUser.username
    const userId = sessionUser.id

    useEffect(() => {
        dispatch(readAttendees(eventId))
    }, [dispatch])

    const rsvpList = useSelector(state => {
        return state.rsvp.rsvpList
    })
    // console.log('rsvps', rsvpList)

    const determineRSVP = () => {
        // let listIdx
        let defaultRsvp = false
        for (let i = 0; i < rsvpList.length; i++) {
            if (rsvpList[i] === username) {
                defaultRsvp = true
                // listIdx = i
            }
        }
        // console.log('defaultRsvp', defaultRsvp)
        return defaultRsvp
    }

    const toggleRSVP = () => {
        // add rsvp
        if (!determineRSVP()) {
            dispatch(addRSVP(userId, eventId, username))
        } else {
            // else remove rsvp
            dispatch(removeRSVP(userId, eventId, username))
        }
    }

    return (
        <div className='rsvp-area'>
            <h3 className='rsvp-header'>Attendees</h3>
            <ul className='attendees-list'>
                {rsvpList.map(name => (
                    <p key={ name }>{ name }</p>
                ))}
            </ul>
            { determineRSVP() ?
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        toggleRSVP()
                        // setShowRSVPForm(false)
                    }}
                    className='rsvp-button'
                >
                    Un-RSVP
                </button> :
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        toggleRSVP()
                        // setShowRSVPForm(false)
                    }}
                    className='rsvp-button'
                >
                    RSVP
                </button> }
        </div>
    )
}

export default RSVPForm
