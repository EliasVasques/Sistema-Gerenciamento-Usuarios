const { Router } = require('express')
const UsuarioSchema = require('../schemas/Usuario')

const router = Router()


router.get('/', (req, res)  => {
    UsuarioSchema.find()
        .then(usuarios => res.render('lista-usuarios', { usuarios: usuarios }))
        .catch(err => console.log(err))
     
})

router.get('/add', (req, res) => {
    res.render('add-usuarios.ejs', { msg: "" })
})

router.post('/add', (req, res)  => {
    const resposta = new UsuarioSchema(req.body)
    console.log(req.body)
    resposta.save()
        .then(usuario => res.render('add-usuarios.ejs', { msg: `${usuario.nome} adcionado com sucesso!`}))
        .catch(err => {
            console.log(err)
            res.render('add-usuarios.ejs', { msg: `Erro ao adcionar usuario!`})
        })
})

module.exports  = router