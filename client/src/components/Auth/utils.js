import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const access_token = 'access_token';

export const setAccessToken = (accessToken) => {
    cookies.set(access_token, { token: accessToken });
};

export const getAccessToken = () => {
    const cookie = cookies.get(access_token);
    return cookie;
};