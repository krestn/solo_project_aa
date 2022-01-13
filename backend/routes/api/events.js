const express = require('express')
const asyncHandler = require('express-async-handler')

const { Event } = require('../../db/models')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')

const router = express.Router()

// 1. defined backend route of /api/events w/ querie of all events in json -> index.js
router.get('/', asyncHandler(async function(_req, res) {
    const event = await Event.findAll()
    // console.log(event)
    return res.json(event)
}))

router.get('/:eventId(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const { eventId } = req.params
    const event = await Event.findByPk(eventId)

    return res.json(event)
}))

const validateEvent = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid event name'),
    check('name')
        .isLength({min: 3})
        .withMessage('Event name cannot be less than 3 characters'),
    check('location')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid location'),
    check('details')
        .exists({ checkFalsy: true })
        .withMessage('Please provide event details'),
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid date'),
    check('date')
        .isAfter()
        .withMessage('Date / time cannot be in the past'),
    check('time')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid time'),
    handleValidationErrors
]

// post event route
router.post('/new', requireAuth, validateEvent, asyncHandler(async(req, res) => {
    console.log('userId', req.user.dataValues)
    console.log('req body', req.body)
    // const { hostId } = req.user.dataValues.id
    const { hostId, name, location, details, date, time } = req.body
    const event = await Event.create({
        hostId,
        name,
        location,
        details,
        date,
        time
    })

    return res.json({ event })
}))

const validateEdit = [
    // check('name')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a valid event name'),
    check('name')
        .isLength({min: 3})
        .withMessage('Event name cannot be less than 3 characters'),
    // check('location')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a valid location'),
    // check('details')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide event details'),
    check('details')
        .isLength({min: 2})
        .withMessage('Details not detailed enough'),
    handleValidationErrors
]

// edit event route
router.put('/:id', requireAuth, validateEdit, asyncHandler(async(req, res) => {
    const { id } = req.params
    const eventToUpdate = await Event.findByPk(id)

    const {
        name,
        details
    } = req.body

    const updatedEvent = {
        name,
        details
    }
    // console.log('updatedEvent', updatedEvent)
    await eventToUpdate.update(updatedEvent)
    // console.log('eventToUpdate', eventToUpdate)
    return res.json({ eventToUpdate })
}))

// delete event route
router.delete('/delete', requireAuth, asyncHandler(async(req, res) => {
    console.log('inside delete backend route')
    const { eventId } = req.body
    const event = await Event.findByPk(eventId)

    await event.destroy()

    return res.json({ msg: 'DELETED' })
}))

module.exports = router
