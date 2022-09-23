const { Router } = require('express')
const UsuarioSchema = require('../schemas/Usuario')
const { ObjectId } = require('mongodb')

const router = Router()

const usuarioDefault = {
    nome: '',
    email: '',
    sexo: '',
    status: '',
    _id: ''
}
// sudo systemctl start mongod

router.get('/', (req, res)  => {
    UsuarioSchema.find()
        .then(usuarios => res.render('lista-usuarios', { usuarios: usuarios }))
        .catch(err => console.log(err))
})

router.get('/add', (req, res) => {
    res.render('add-usuarios.ejs', { msg: "",  usuario: usuarioDefault  })
})

router.post('/add', (req, res)  => {
    const resposta = new UsuarioSchema(req.body)
    console.log(req.body)
    resposta.save()
        .then(usuario => res.render('add-usuarios.ejs', { msg: `${usuario.nome} adcionado com sucesso!`, usuario: usuarioDefault }))
        .catch(err => {
            console.log(err)
            res.render('add-usuarios.ejs', { msg: `Erro ao adcionar usuario!`, usuario: usuarioDefault  })
        })
})

router.get('/editar/:id',(req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        UsuarioSchema.findOne({ _id: ObjectId(req.params.id) })
            .then(usuario => res.render('editar-usuarios.ejs', { msg: "", usuario: usuario }))
            .catch(err => {
                console.log(err)
                res.render('editar-usuarios.ejs', { msg: "Usuário não encontrado!", usuario: usuarioDefault })
            })
    } else {
        res.render('editar-usuarios.ejs', { msg: "Id inválido!", usuario: usuarioDefault  } )
    }
})

router.post('/editar/:id',(req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        UsuarioSchema.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body)
            .then(() => res.render('editar-usuarios.ejs', { msg: "Atualizado com sucesso!", usuario: req.body }))
            .catch(err => {
                console.log(err)
                res.render('editar-usuarios.ejs', { msg: "Usuário não encontrado!", usuario: usuarioDefault})
            })
    } else {
        res.render('editar-usuarios.ejs', { msg: "Id inválido!", usuario: usuarioDefault  })
    }
})


module.exports  = router