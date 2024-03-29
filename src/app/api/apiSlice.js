import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3500/api/v1',
    baseUrl: process.env.REACT_APP_API_END_POINT,

    prepareHeaders: (Headers, { getState }) => {
        const firebaseIdToken = getState().auth.user?.firebaseIdToken; 
        if (firebaseIdToken) {
            Headers.set('authorization', `Bearer ${firebaseIdToken}`);
        }
        return Headers;
    },
});

export const apiSlice = createApi({
    // reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Todo', 'Project'],
    endpoints: (builder) => ({}),
});
