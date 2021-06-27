import jwtDecode from 'jwt-decode';

export const ACCESS_TOKEN = 'accessToken';

interface Token {
    name: string;
    exp: number;
    userId: number;
}

/**
 *
 * @returns the access token with a bearer prefix
 */
export const getAccessTokenFromLocal = () => {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN) || '';

        if (!accessToken) return '';

        // Will throw an error in case of invalid token
        const { exp } = jwtDecode<Token>(accessToken);
        const now = Date.now();

        if (now >= exp * 1000) {
            // TODO refresh_token
        }

        const withBearer = `bearer ${accessToken}`;
        return withBearer;
    } catch (err) {
        console.log('getAccessTokenFromLocal ~ err', err);
        return '';
    }
};
