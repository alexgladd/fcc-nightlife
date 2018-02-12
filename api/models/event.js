// event (bar + day) model

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const barSchema = new mongoose.Schema({
  id:     { type: String, required: true },
  name:   { type: String, required: true },
  url:    { type: String, required: true },
  imgUrl: { type: String, required: true }
}, {
  _id: false
});

const attendeeSchema = new mongoose.Schema({
  userId:      { type: ObjectId, required: true, get: i => i.toString() },
  userName:    { type: String, required: true },
  userImgUrl:  { type: String }
}, {
  _id: false
});

const eventSchema = new mongoose.Schema({
  bar:       { type: barSchema, required: true },
  date:      { type: String, required: true },
  attendees: [ attendeeSchema ]
});

eventSchema.index({ 'date': -1, 'bar.id': 1 }, { unique: true });

eventSchema.methods.toEventResponse = function() {
  return {
    id: this.id,
    date: this.date,
    bar: this.bar,
    attendees: this.attendees
  };
}

module.exports = mongoose.model('Event', eventSchema);
