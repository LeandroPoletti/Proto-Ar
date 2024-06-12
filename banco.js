const postgres = require('postgres')

const sql = postgres('postgres://postgres:Senha123@localhost:5432/Proto-Ar')


async function iniciarBanco() {
    try{
        await sql `
    CREATE TABLE IF NOT EXISTS lote (
        id SERIAL NOT NULL PRIMARY KEY,
        ultima_manutencao DATE DEFAULT CURRENTDATE
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
        horario TIMESTAMP DEFAULT LOCALTIMESTAMP,
        dispositivo_id INT NOT NULL REFERENCES dispositivos(id)
    );
`
        console.log('Tables created successfully');   
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
    }
}

async function insertData(dados){
    try{
        await sql `INSERT INTO eventos(dispositivo_id, horario) values (${dados.id_device}, localtimestamp);`
    }catch (error){
        console.log("Erro ao limpar tabelas " + error)
        return false
    }finally{
        return true
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
        await sql `insert into eventos (horario, dispositivo_id) values (LOCALTIMESTAMP(2),2), (make_timestamp(2013, 7, 15, 8, 15, 23.5),2);`
    }catch (error){
        console.log("Erro ao popular tabelas " + error)
        return false
    }finally{
        return true
    }
}
 

async function retrieveAllDataInfo() {
    try {
        resultado = await sql `
        select evnt.id AS id_evento, evnt.horario AS horario_evento, dev.id AS id_dispositivo,
        dev.nome AS nome_dispositivo, lote.id AS id_lote,
        lote.ultima_manutencao AS ultima_manutencao_lote 
          from eventos evnt
	        inner join dispositivos AS dev on 
	            evnt.dispositivo_id = dev.id
	        inner join lote on
    	        dev.lote_id = lote.id;
        
        `
    } catch (error) {
        console.log("Erro ao consultar tabelas: " + error)
    }

    return resultado
    
}



module.exports = {
    setup: iniciarBanco,
    createTestData: populateTables,
    removeAllData: clearAllValues,
    retrieveAllDataInfo,
    insertData
}
