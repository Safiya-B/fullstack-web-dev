const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const url = process.env.MONGODB_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const PersonSchema = new mongoose.Schema({
  name: { type: String, unique: true, minLength: 3 },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^[\d]{2,3}[-]?[\d]{6,10}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

PersonSchema.plugin(uniqueValidator)

PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Person = mongoose.model("Person", PersonSchema)

/* let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

persons.forEach((person) => {
  new Person(person).save().then((result) => {
    console.log("person saved!");
  });
}); */

module.exports = Person
