const ADD_EVENT = 'events/ADD_EVENT';


const addEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const createEvent = (payload) => async (dispatch) => {
  const response = await fetch(`/api/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await response.json();
  dispatch(addEvent(data));
  return data;
}

const initialState = {
  hostId: '',
  venueId: '',
  title: '',
  description: '',
  capacity: '',
  private: '',
  date: ''

};

const sortList = (list) => {
  return list.sort((eventA, eventB) => {
    return eventA.no - eventB.no;
  }).map((event) => event.id);
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT: {
      if (!state[action.event.id]) {
        const newState = {
          ...state,
          [action.event.id]: action.event
        };
        const eventList = newState.list.map(id => newState[id]);
        eventList.push(action.event);
        newState.list = sortList(eventist);
        return newState;
      }
      return {
        ...state,
        [action.event.id]: {
          ...state[action.event.id],
          ...action.event,
        }
      };
    }
    
    default:
      return state;
  }
}

export default eventReducer;
