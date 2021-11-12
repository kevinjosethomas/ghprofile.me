export const requireQueryParam = (paramNames, errorMessage) => (req, res, next) => {
    const name = (paramNames.map(name => req.query[name]).find(name => name !== undefined) || '').toLowerCase();
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
