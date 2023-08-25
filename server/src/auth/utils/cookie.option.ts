const sevenDaysInSeconds = 7 * 24 * 60 * 60;

export const cookieOption = {
  httpOnly: true,
};

export const refreshTokenCookieOption = {
  httpOnly: true,
  expires: new Date(Date.now() + sevenDaysInSeconds * 1000),
};
