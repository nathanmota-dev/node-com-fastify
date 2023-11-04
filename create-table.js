import sql from './db.js'

sql`CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER
);`.then(() => {
    console.log('Tabela criada com sucesso!');
});