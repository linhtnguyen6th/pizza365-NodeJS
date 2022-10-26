const orderMiddleware = (req, res, next) => {
    console.log(`Method: ${req.method} - URL: ${req.url} - Time: ${new Date()}`);

    next();
};

//module exports
module.exports = { orderMiddleware }; 