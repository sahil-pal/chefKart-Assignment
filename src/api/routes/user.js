const express = require("express");
const router = express.Router();

const { addUser } = require("../../controller/user");
const { REGISTER } = require("../../utils/config").ROUTES.USER;

router.post(REGISTER,addUser);

module.exports = router;
