import jwt from 'jsonwebtoken';

async function generateJwt ({ email, id }: { email: string, id: string }) {
  const token = jwt.sign(
    {
      // custom claims go here
      email,
      id
    },
    `${process.env.EXAMPLE_JWT_SIGNING_KEY}`,
    {
      issuer: process.env.SHARED_JWT_ISSUER,
      expiresIn: process.env.SHARED_JWT_EXPIRATION,
      algorithm: 'HS256'
    }
  );

  return token;
}

export default generateJwt;
