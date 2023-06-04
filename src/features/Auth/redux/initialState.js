const initialState = {
    user    : {
        id       : null,
        user_name: null,
        email    : null,
    },
    meta    : {
        token: null,
    },
    login   : {
        loading: false,
    },
    register: {
        loading: false,
        success: false
    }
};

export default initialState;
