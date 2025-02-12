import express from 'express';

//parseo del JSON
const jsonMiddleware = express.json({
    limit: '1mb', //limita a tamaño de body a 1mb

    strict: true, //solo acepta JSON válidos
});

export default jsonMiddleware;
