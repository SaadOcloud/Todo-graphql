import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, HttpLink, split } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import './index.css';
import App from './App';


const httpLink = new HttpLink({
    uri: 'http://localhost:5000/'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);


const client = new ApolloClient({ link, cache: new InMemoryCache() });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    (<ApolloProvider client={client}>
        <App />
    </ApolloProvider>));

