import {
    ApolloClient,
    ApolloLink,
    from,
    HttpLink,
    InMemoryCache,
} from '@apollo/client';
import { getAccessTokenFromLocal } from './auth';
import { onError } from '@apollo/client/link/error';

const serverURL = String(process.env.REACT_APP_SERVER_URL);

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: await getAccessTokenFromLocal(),
        },
    }));

    return forward(operation);
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const initApolloClient = () => {
    const cache = new InMemoryCache();

    const httpLink = new HttpLink({
        uri: serverURL,
    });

    const client = new ApolloClient({
        cache,

        // Backend is a different domain.
        credentials: 'include',

        // Send the accessToken in the headers for every request.
        link: from([authMiddleware, errorLink, httpLink]),
    });
    return client;
};
