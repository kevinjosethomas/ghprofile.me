export const requireQueryParam = (paramNames, errorMessage) => (req, res, next) => {
    const name = (paramNames.map(name => req.query[name]).filter(name => name !== undefined)[0] || '').toLowerCase();
    if (name) {
        if (!req.opts) req.opts = {};
        req.opts.name = name;
        next();
        return;
    }

    res.status(400).json({
        success: false,
        message: errorMessage
    }).end();
};
