const { Schema, model } = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

course.method('toClient', function (params) {
    const cours = this.toObject()

    cours.id = course_.id
    delete cours._id
    return cours
})

module.exports = model('Course', course)