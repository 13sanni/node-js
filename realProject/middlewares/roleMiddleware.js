export function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return next({
            status: 403,
            message: "forbidden: unauthorized access"
        });
    }

    next();
};



export default requireAdmin;