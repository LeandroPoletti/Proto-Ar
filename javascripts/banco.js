import postgres from "postgres";

const sql = postgres('postgres://postgres:Senha123@localhost:5432/Proto-Ar')

const tableCreate = await sql `
    CREATE TABLE IF NOT EXISTS eventos (
        id SERIAL NOT NULL PRIMARY KEY,
        
    );
`