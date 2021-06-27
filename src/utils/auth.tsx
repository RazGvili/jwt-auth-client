import jwtDecode from 'jwt-decode';

export const ACCESS_TOKEN = 'accessToken';

interface Token {
    name: string;
    exp: number;
    userId: number;
}

/**
 * TODO
 * Code a proper api module to diff between envs
 */
const refreshToken = async () => {
    try {
        const response = await fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include',
        });
        const body = await response.json();
        const accessToken = body?.accessToken || '';
        console.log('refreshToken ~ accessToken', accessToken);

        return accessToken;
    } catch (err) {
        console.log('refreshToken ~ err', err);
        return '';
    }
};

/**
 *
 * @returns the access token with a bearer prefix
 */
export const getAccessTokenFromLocal = async () => {
    try {
        let accessToken = localStorage.getItem(ACCESS_TOKEN) || '';

        if (!accessToken) return '';

        // Will throw an error in case of invalid token
        const { exp } = jwtDecode<Token>(accessToken);
        const now = Date.now();

        if (now >= exp * 1000) {
            accessToken = await refreshToken();
        }

        const withBearer = `bearer ${accessToken}`;
        return withBearer;
    } catch (err) {
        console.log('getAccessTokenFromLocal ~ err', err);
        return '';
    }
};
