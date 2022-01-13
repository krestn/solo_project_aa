import { csrfFetch } from "./csrf"

const ATTENDEES = 'rsvps/ATTENDEES'
const ADD_ATTENDEE = 'rsvps/ADD_ATTENDEE'
const REMOVE_ATTENDEE = 'rsvps/REMOVE_ATTENDEE'

const getAttendees = rsvpList => ({
    type: ATTENDEES,
    rsvpList
})

const addAttendee = username => ({
    type: ADD_ATTENDEE,
    username
})

const removeAttendee = username => ({
    type: REMOVE_ATTENDEE,
    username
})

export const readAttendees = (eventId) => async dispatch => {
    const res = await fetch(`/api/rsvps/${eventId}`)
    // const res = await fetch(`/api/rsvps`)
    const rsvpList = await res.json()
    // console.log('rsvplist', rsvpList)
    // console.log('inside thunk', rsvpList)
    dispatch(getAttendees(rsvpList))
}

export const addRSVP = (userId, eventId, username) => async dispatch => {
    const res = await csrfFetch('/api/rsvps/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, eventId })
    })
    // dispatch action obj above, addAttendee
    const rsvp = await res.json()
    dispatch(addAttendee(username))
}

export const removeRSVP = (userId, eventId, username) => async dispatch => {
    const res = await csrfFetch('/api/rsvps/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, eventId })
    })

    const rsvp = await res.json()
    if (rsvp.msg === 'Un-RSVP\'d') {
        dispatch(removeAttendee(username))
    }
}

const initialState = {
    rsvpList: []
}

const rsvpReducer = (state = initialState, action) => {
    // console.log('inside reducer')
    switch (action.type) {
        case ATTENDEES:
            // console.log('action', action.rsvpList)
            const allAttendees = {}
            for (let i = 0; i < action.rsvpList.length; i++) {
                allAttendees[i] = action.rsvpList[i]
            }
            return { ...allAttendees, ...state, rsvpList: action.rsvpList }
        case ADD_ATTENDEE:
            return {
                ...state,
                rsvpList: [...state.rsvpList, action.username]
            }
        case REMOVE_ATTENDEE:
            const updatedList = state.rsvpList
            for (let i = 0; i < state.rsvpList.length; i++) {
                if(state.rsvpList[i] === action.username) {
                    updatedList.splice(i, 1)
                    break
                }
            }
            const newState = {
                ...state,
                rsvpList: [...updatedList]
            }
            return newState
        default:
            return state
    }
}

export default rsvpReducer
