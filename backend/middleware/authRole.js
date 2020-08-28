import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authRole = requiredRoles => {
  return async (req, res, next) => {
    const decodedJWT = req.jwt;

    const userRecord = await prisma.user.findOne({
      where: { id: decodedJWT.id }
    });

    const { role } = userRecord;

    if (!userRecord) {
      return status(404).json({ error: 'user.notFound' });
    } else if (!!requiredRoles && !isCorrectRole(requiredRoles, role)) {
      return status(403).json({ error: 'user.unauthorized' });
    } else {
      return next();
    }
  };
};

const isCorrectRole = (requiredRoles, userRole) => {
  if (typeof requiredRoles === 'string') return userRole === requiredRoles;
  else return requiredRoles.includes(userRole);
};
