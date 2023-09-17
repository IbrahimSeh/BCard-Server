const registeredUserMw = async (req, res, next) => {
    try {
        console.log('req.userData._id = ', req.userData._id);
        console.log('req.params.id = ', req.params.id);
        if (req.userData._id == req.params.id) {
            next();
        } else {
            res.status(401).json({ msg: "you not the registered user !!" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};
module.exports = registeredUserMw;
