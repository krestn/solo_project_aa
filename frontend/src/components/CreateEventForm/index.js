import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../store/pokemon';
import { useHistory } from 'react-router-dom';

const CreateEventForm = ({ hideForm }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hostId, setHostId] = useState(sessionUser.id)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [open, setOpen] = useState('y');
  const [date, setDate] = useState('');

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateCapacity = (e) => setCapacity(e.target.value);
  const updateOpen = (e) => setOpen(e.target.value);
  const updateDate = (e) => setDate(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      hostId,
      venueId,
      title,
      description,
      capacity,
      open,
      date,
    };

    let createdEvent = await dispatch(createEvent(payload));

    if (createdEvent) {
      history.push(`/events/${createdEvent.id}`);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder="Event Details"
          required
          value={description}
          onChange={updateDecsription} />
        <input
          type="number"
          placeholder="Capacity"
          min="1"
          max="100000"
          required
          value={capacity}
          onChange={updateCapacity} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName} />
        <input
          type="text"
          placeholder="Move 1"
          value={move1}
          onChange={updateMove1} />
        <input
          type="text"
          placeholder="Move 2"
          value={move2}
          onChange={updateMove2} />
        <select onChange={updateType}>
          {pokeTypes.map(type =>
            <option key={type}>{type}</option>
          )}
        </select>
        <button type="submit">Create new Pokemon</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreatePokemonForm;
