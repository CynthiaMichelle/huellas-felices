'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usuarioSchema = mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  direccion: String,
  documento: String,
  telefono: String,
  haTenidoMascotas: Boolean
})

// método estático
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}

// método de instancia
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password)
}

// crear el modelo
var Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
