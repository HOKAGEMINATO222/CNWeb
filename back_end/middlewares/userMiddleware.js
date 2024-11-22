const jwt = require('jsonwebtoken');

<<<<<<< HEAD
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Không có quyền truy cập!' });
=======
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Bạn chưa đăng nhập' });
>>>>>>> origin/feature/phan_viet_hoang
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token không hợp lệ!' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
