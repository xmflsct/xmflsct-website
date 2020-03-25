const isBrowser = typeof window !== `undefined`;

const getSecret = () =>
  window.localStorage.xmflsctSecret
    ? JSON.parse(window.localStorage.xmflsctSecret)
    : {};

const setSecret = secret =>
  (window.localStorage.xmflsctSecret = JSON.stringify(secret));

export const handleLogin = ({ secret }) => {
  console.log(secret);
  if (!isBrowser) return false;

  if (secret === `newchallenge2020`) {
    return setSecret({
      allowed: true,
      timestamp: new Date().getTime()
    });
  }

  return false;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const secret = getSecret();
  if (new Date().getTime() - secret.timestamp > 30 * 60000) {
    setSecret({});
    return false;
  }

  return !!secret.allowed;
};
