var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/forms', require('./form/formRoutes'));

module.exports = router;
