export const port = process.env.PORT || 4000;

export const COOKIE_CONFIG = {
  maxAge: 365 * 52 * 7 * 24 * 60,
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  // domain: 'vercel.app',
  // sameParty: false
  // path: '/',
};

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://challenge-board.vercel.app';

const frontendUrlDev = 'http://localhost:3000';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? frontendUrlProd : frontendUrlDev;

export const CORSwhitelist =
  process.env.NODE_ENV === 'production'
    ? [frontendUrlProd, deployedUrl]
    : frontendUrlDev;
