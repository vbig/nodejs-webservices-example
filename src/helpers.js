const { isUuid } = require("uuidv4");

function checkUuidIsValid(req, res, next) {
  if (!isUuid(req.params.id))
    return res.status(400).json({
      message: "ID should be a valid UUID.",
    });

  return next();
}

module.exports = checkUuidIsValid;
