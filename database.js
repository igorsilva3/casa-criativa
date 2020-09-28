const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./casa_criativa.db', function(err){
    if (err) {
        return console.error(err.message);
    }
    return console.log('Connected to the casa_criativa SQlite database.')
})

database.serialize(function (){
    // Create table
    database.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            url TEXT
        );
    `)

    // Delete data in table
    /* database.run(query, [id],
    function(err){
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }
    }) */
})

module.exports = database