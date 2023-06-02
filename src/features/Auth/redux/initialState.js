const initialState = {
    user   : {
        id       : null,
        name     : null,
        email    : null,
        portfolio: {
            id     : null,
            logoUrl: null
        }
    },
    meta   : {
        token      : null,
        role       : null,
        permissions: [],
    },
    configs: {
        homepage: '/'
    },
    login  : {
        loading: false,
    }
};

export default initialState;
