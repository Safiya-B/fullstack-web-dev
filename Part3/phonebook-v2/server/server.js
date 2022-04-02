require("dotenv").config()
const morganBody = require("morgan-body")
const express = require("express")
const cors = require("cors")
const app = express()
const Person = require("./Persons")

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

morganBody(app)

app.get("/", (req, res) => {
  res.send("Phonebook api")
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch((err) => next(err))
})

app.get("/info", (req, res, next) => {
  const date = new Date()

  Person.estimatedDocumentCount()
    .then((docCount) => {
      res.send(
        `<p>Phonebook has info for ${docCount} people <br><br> ${date}</p>`
      )
    })
    .catch((err) => {
      next(err)
    })
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then((response) => res.status(204).end())
    .catch((err) => next(err))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
  }

  new Person(newPerson)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  const newNum = req.body.number

  Person.findById(id)
    .then((person) => {
      if (person) {
        person.set({ number: newNum })
        person
          .save()
          .then((result) => res.json(result))
          .catch((err) => next(err))
      } else return res.status(404).end()
    })
    .catch((err) => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("server running on port :", port)
})
