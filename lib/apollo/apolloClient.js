import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, SchemaLink, HttpLink } from '@apollo/client';

let apolloClient

function createIsomorphLink() {
    if (typeof window === 'undefined'){
        return null
    }
    else {
        return new HttpLink({
            uri: process.env.NEXT_PUBLIC_WP_API_URL,
        })
    }
}


function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: createIsomorphLink(),
        cache: new InMemoryCache(),
    })
}


export function initializeApollo(initialState = null){
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        const existingCache = _apolloClient.extract()

        _apolloClient.cache.restore({ ...existingCache, ...initialState})
    }

    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}