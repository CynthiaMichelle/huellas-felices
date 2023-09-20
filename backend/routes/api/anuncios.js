'use strict'
const express = require('express')
const upload = require('../../lib/multerConfig')
const router = express.Router()
const { Anuncio } = require('../../models')

router.get('/', async (req, res, next) => {
  try {
    // filtros
    const filterByName = req.query.nombre
    const filterByRaza = req.query.raza
    const filterByStock = req.query.disponible
    const filterByPerro = req.query.perro
    const filterBySexo = req.query.sexo
    const filterBySize = req.query.size
    const filterByUser = req.query.usuarioName

    // paginación
    const start = parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 1000 // nuestro api devuelve max 1000 registros
    // ordenar
    const sort = {creacion: -1}
    // selección de campos
    const fields = req.query.fields

    const filtro = {}

    if (filterByName) {
      filtro.nombre = new RegExp(req.query.nombre, 'i')
    }
    if (filterByRaza) {
      filtro.raza = new RegExp(req.query.raza, 'i')
    }
    if (filterByStock) {
      filtro.disponible = filterByStock
    }
    if (filterByPerro) {
      filtro.perro = filterByPerro
    }
    if (filterBySexo) {
      filtro.sexo = filterByPerro
    }
    if (filterBySize) {
      filtro.size = filterBySize
    }
    if (filterByUser) {
      filtro.usuarioName = new RegExp(`^${req.query.usuarioName}$`)
    }
    const anuncios = await Anuncio.lista(filtro, start, limit, sort, fields)
    res.locals.anuncios = anuncios
    res.json(anuncios)
  } catch (error) {
    next(error)
  }
})

router.post('/', upload.single('foto'), async (req, res, next) => {
  try {
    const {nombre, edad, raza, sexo, size, perro, descripcion} = req.body
    let foto = ''
    if (req.file) {
      foto = req.file.filename // Obtenemos el nombre de la imagen si se envió
    }
    // El usuario autenticado está disponible en req.user
    const newAnuncio = new Anuncio({
      nombre: nombre,
      edad: edad,
      raza: raza,
      disponible: true,
      sexo: sexo,
      size: size,
      foto,
      perro: perro,
      descripcion: descripcion,
      creacion: new Date(),
      usuarioName: req.user.name
    })

    await newAnuncio.save()
    res.status(201).json(newAnuncio)
  } catch (err) {
    res.status(500).json({mensaje: 'Error interno del servidor.'})
  }
})

router.get('/:anuncioId', (req, res, next) => {
  Anuncio.list({ '_id': req.params.anuncioId }, 0, 1, '_id', false).then(anuncios => {
    res.json({result: anuncios.rows[0]})
  }).catch(err => { err.status = 404; err.message = 'Anuncio no encontrado'; next(err) })
})

router.delete('/:anuncioId', (req, res, next) => {
  Anuncio.deleteOne({ '_id': req.params.anuncioId }).then(() => {
    res.json({result: 'El anuncio se ha borrado correctamente'})
  }).catch(err => { err.status = 404; err.message = 'Anuncio no encontrado'; next(err) })
})

// Ruta protegida
router.post('/ruta_protegida', async (req, res) => {
  // El usuario autenticado está disponible en req.user
  const email = req.user
  res.json(email)
})
module.exports = router
