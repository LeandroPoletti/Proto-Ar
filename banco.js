const postgres = require('postgres')

const sql = postgres('postgres://postgres:Senha123@localhost:5432/Proto-Ar')


async function executar() {
    try{
        await sql `
    CREATE TABLE IF NOT EXISTS lote (
        id SERIAL NOT NULL PRIMARY KEY,
        ultima_manutencao DATE
    ); `
    await sql`

    CREATE TABLE IF NOT EXISTS dispositivos (
        id SERIAL NOT NULL PRIMARY KEY,
        nome VARCHAR NOT NULL,
        lote_id INT NOT NULL REFERENCES lote(id) 
    );`

    await sql`
    CREATE TABLE IF NOT EXISTS eventos (
        id SERIAL NOT NULL PRIMARY KEY,
        horario TIMESTAMP,
        dispositivo_id INT NOT NULL REFERENCES dispositivos(id)
    );
`
        console.log('Tables created successfully');   
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        await sql.end();
    }
}

module.exports = {
    executar
}
