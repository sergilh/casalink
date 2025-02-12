// middleware/notFoundMiddleware.js

const notFoundMiddleware = (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada',
    });
};

module.exports = notFoundMiddleware;
