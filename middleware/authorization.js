const UnauthorizedError = require("../errors/unauthorized");
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user);
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
module.exports = { authorizePermissions };
