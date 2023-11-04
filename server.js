import { fastify } from 'fastify';
//import { DatabaseMemory } from './database-memory.js'; //importando a classe DatabaseMemory
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

//const database = new DatabaseMemory(); //instanciando a classe DatabaseMemory (memoria local)
const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body;

    await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send(); //201 - algo foi criado
})

server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list();

    return videos;

})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    reply.status(204).send(); //204 - algo foi atualizado
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send(); //204 - algo foi deletado
})

server.listen({
    port: process.env.PORT || 3000,
})