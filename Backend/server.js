var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

var sequelize = new Sequelize('documents', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})
sequelize.authenticate().then(function(){
    console.log('Success')
})

var Categories = sequelize.define('categories', {
    id: {type: Sequelize.INTEGER ,primaryKey:true},
    name: Sequelize.STRING,
    description: Sequelize.STRING
},{
     timestamps:false
})

var Documents = sequelize.define('documents', {
    id:{type:Sequelize.INTEGER ,primaryKey:true},
    content: Sequelize.STRING,
    type: Sequelize.STRING,
    link:Sequelize.STRING,
    category_id:Sequelize.INTEGER
    
}, {
    timestamps:false
})

Documents.belongsTo(Categories, {foreignKey: 'category_id', targetKey: 'id'})

var app = express()
app.use('/nodeamin', nodeadmin(app))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


//Operatiile get, post, put, delete pentru tabela Categories

//Citesc categoriile
app.get('/categories', function(request, response) {
    Categories.findAll().then(function(categories){
        response.status(200).send(categories)
    })
        
})
//Citesc o categorie dupa id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
})

//Creez o noua categorie 
app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(category) {
        response.status(201).send(category)
    })
})

//Fac o operatie de update pe server si adaug o categorie cu un anumit id
app.put('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.update(request.body).then(function(category){
                response.status(201).send(category)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//Stergerea unei anumite categorii de pe server

app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//Operatiile get, post, put, delete pentru tabela Documents

//Citesc toate documentele din toate categoriile

app.get('/documents', function(request, response) {
  Documents.findAll(
        {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('documents.category_id') }
            }]
        }
        
        ).then(
            function(documents) {
                response.status(200).send(documents)
            }
        )
})
//Citesc un anumit document dupa id
app.get('/documents/:id', function(request, response) {
    Documents.findById(request.params.id).then(
            function(document) {
                response.status(200).send(document)
            }
        )
})
//Creez un nou document
app.post('/documents', function(request, response) {
    Documents.create(request.body).then(function(document) {
        response.status(201).send(document)
    })
})

//Fac o operatie de update pe server si adaugun document cu un anumit id


app.put('/documents/:id', function(request, response) {
   Documents.findById(request.params.id).then(function(document) {
        if(document) {
          document.update(request.body).then(function(document){
                response.status(201).send(document)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
//Sterg un document cu un anumit id

app.delete('/documents/:id', function(request, response) {
    Documents.findById(request.params.id).then(function(document) {
        if(document) {
            document.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
//Citesc documentele dintr-o anumita categorie

app.get('/categories/:id/documents', function(request, response) {
   Documents.findAll({where:{category_id: request.params.id}}).then(
            function(documents) {
                response.status(200).send(documents)
            }
        )
})

app.listen(8080);

