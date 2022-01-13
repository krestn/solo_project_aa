const express = require('express')
const asyncHandler = require('express-async-handler')

const { RSVP, User, Sequelize } = require('../../db/models')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')

const router = express.Router()

// list all rsvps
router.get('/', asyncHandler(async function(req, res) {
    const rsvps = await RSVP.findAll()
    // console.log(rsvps)
    return res.json(rsvps)
}))

// get attendees by eventId
router.get('/:eventId', asyncHandler(async function(req, res) {
    const { eventId } = req.params
    const eventRSVPS = await RSVP.findAll({
        where: {
            eventId
        }
    })

    const attendeeList = eventRSVPS.map(rsvp => rsvp.dataValues.userId)

    const namesArray = []

    for (let i = 0; i < attendeeList.length; i++) {
        let userId = attendeeList[i]
        const user = await User.findByPk(userId)
        const username = user.dataValues.username
        namesArray.push(username)
    }
    return res.json(namesArray)
}))

// add rsvp to rsvps table
router.post('/add', requireAuth, asyncHandler(async(req, res) => {
    console.log('req', req.body)
    const { userId, eventId } = req.body

    const rsvp = await RSVP.create({
        eventId,
        userId
    })

    return res.json({ rsvp })
}))

// remove rsvp from rsvps table
router.delete('/remove', requireAuth, asyncHandler(async(req, res) => {
    const { userId, eventId } = req.body
    console.log('userId', userId)
    console.log('eventId', eventId)
    // const Op = Sequelize.Op
    const rsvp = await RSVP.findOne({
        where: {
            userId,
            eventId
        }
    })
    console.log('rsvp', rsvp)

    await rsvp.destroy()
    return res.json({ msg: 'Un-RSVP\'d' })
}))

module.exports = router
