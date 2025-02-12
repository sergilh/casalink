// middleware/notFoundMiddleware.js

const staticResourcesMiddleware = (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada',
    });
};

module.exports = staticResourcesMiddleware;
