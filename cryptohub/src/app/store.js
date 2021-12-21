import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../sevices/cryptoApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});