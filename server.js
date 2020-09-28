// Express used for to create and setting my server
const express = require("express")
const server = express()

const database = require('./database')

// Setting static files (css, scripts, images)
server.use(express.static("static"))

// Enable use of request.body
server.use(express.urlencoded({extended: true}))

// Setting nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Creating a initial route (/)
server.get("/", function (request, response) {

    database.all(`SELECT * FROM ideas;`, function(err, rows){
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        const lastIdeas = []

        for (let idea of rows) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return response.render("index.html", {ideas: lastIdeas})
    })
})

// Creating a route for ideas
server.get("/ideas", function (request, response) {

    database.all(`SELECT * FROM ideas;`, function(err, rows){
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        return response.render("ideas.html", {ideas: rows})
    })
})

server.post("/", function (request, response) {
    // Insert data in table

    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            url
        ) VALUES (?,?,?,?,?);
    `

    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.url,
    ]

    database.run(query, values, function(err){
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        return response.redirect("/ideas")
    })
})

// Start server
server.listen(3000) 