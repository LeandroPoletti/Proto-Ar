const postgres = require('postgres')

const sql = postgres('postgres://postgres:Senha123@localhost:5432/Proto-Ar')


async function iniciarBanco() {
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

async function clearAllValues() {
    try{
        await sql `TRUNCATE lote, dispositivos, eventos RESTART IDENTITY cascade;`
    }catch (error){
        console.log("Erro ao limpar tabelas " + error)
        return false
    }finally{
        return true
    }
}

async function populateTables(){
    try{
         
        await sql `insert into lote (ultima_manutencao) values (CURRENT_DATE), (to_date('2024-01-06', 'YYYY-MM-DD'));`
        await sql `insert into dispositivos (nome, lote_id) values ('Dispositvo teste 1',2), ('Dispositvo teste 2',1);`
        await sql `insert into eventos (horario, dispositivo_id) values (LOCALTIMESTAMP(2),2), (make_timestamp(2013, 7, 15, 8, 15, 23.5),1);`
    }catch (error){
        console.log("Erro ao popular tabelas " + error)
        return false
    }finally{
        return true
    }
}
/* 
select * from eventos 
	inner join dispositivos on 
	eventos.dispositivo_id = dispositivos.id
	inner join lote on
	dispositivos.lote_id = lote.id;

*/



module.exports = {
    setup: iniciarBanco
}
