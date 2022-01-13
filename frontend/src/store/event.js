import { csrfFetch } from "./csrf"

const LOAD = 'events/LOAD'
const ADD_ONE = 'events/ADD_ONE'
const EDIT_EVENT = 'events/EDIT_EVENT'
const DELETE_ONE = 'events/DELETE_ONE'

// 3. defined action of loading events.
const load = list => ({
    type: LOAD,
    list
})

const addEvent = event => ({
    type: ADD_ONE,
    event
})

const updateEvent = event => ({
    type: EDIT_EVENT,
    event
})

const removeEvent = eventId => ({
    type: DELETE_ONE,
    eventId
})

// 4. function w/ async dispatch, fetches json from backend route
export const getEvents = () => async dispatch => {
    const res = await fetch('/api/events')
    if(res.ok) {
        // 5. define list as the json obj
        const list = await res.json()
        // 6. call dispatch with defined action f(x) with step 5 as param
        // param needs to match below and above in action f(x)
        dispatch(load(list))
    }
}

export const createEvent = data => async dispatch => {
    // console.log('data', data)
    const res = await csrfFetch('/api/events/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log('res', res)
    try {
        const event = await res.json()
        dispatch(addEvent(event.event))
        // return {
        //     type: ADD_ONE,
        //     event: res
        // }
    } catch (e) {
        return {
            type: 'ADD_ONE_FAIL',
            errorMsg: e.message
        }
    }
}

export const deleteEvent = eventId => async dispatch => {
    const res = await csrfFetch(`/api/events/delete`, {
        method: "DELETE",
        body: JSON.stringify({ eventId })
    })
    const data = await res.json()

    if (data.msg === 'DELETED') {
        dispatch(removeEvent(eventId))
    }
}

export const editEvent = data => async dispatch => {
    const res = await csrfFetch(`/api/events/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log('res', res)
    if (res.ok) {
        const event = await res.json()
        console.log(event)
        dispatch(updateEvent(event))
    }
}

const initialState = {
    list: [],
    errorMsg: ''
}

// 7. add case for action type (LOAD). describes how action will update state.
const eventReducer = (state = initialState, action) => {
    // console.log('action', action.type)
    switch (action.type) {
        case LOAD:
            const allEvents = {}
            action.list.forEach(event => {
                allEvents[event.id] = event
            })
            // 8. return new state. -> ./index
            return { ...allEvents, ...state, list: action.list }
        case ADD_ONE:
            return {
                ...state,
                // above returns the previous state, below sets the list key of
                // said previous state to old state.list, with added action.event
                // action = addEvent, .event keys in to event key set inside
                list: [...state.list, action.event]
            }
        case 'ADD_ONE_FAIL':
            return {
                ...state,
                errorMsg: action.errorMsg
            }
        case EDIT_EVENT:
            const eventList = state.list
            for (let i = 0; i < eventList.length; i++) {
                if (eventList[i].id === action.event.eventToUpdate.id) {
                    eventList.splice(i, 1, action.event.eventToUpdate)
                    break
                }
            }
        case DELETE_ONE:
            const updatedList = state.list
            for (let i = 0; i < state.list.length; i++) {
                if (state.list[i].id === action.eventId) {
                    updatedList.splice(i, 1)
                    break
                }
            }
            const newState = {
                ...state,
                list: [...updatedList]
            }
            return newState
        default:
            return state
    }
}

export default eventReducer
