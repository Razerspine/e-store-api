const roles = require('../config/roles');

function requirePermission(permission) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    const permissions = roles[userRole] || [];
    if (permissions.includes('*') || permissions.includes(permission)) {
      return next();
    }
    return res.status(403).json({
      message: `Access denied: role "${userRole}" does not have permission for "${permission}"`
    });
  };
}

module.exports = requirePermission;
