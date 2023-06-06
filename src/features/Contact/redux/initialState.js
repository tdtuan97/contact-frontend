const initialState = {
    list: {
        data: [],
        loading: false,
    },

    create: {
        errors: {},
        data: {},
        loading: false,
    },

    detail: {
        errors: {},
        data: {},
        loading: false,
    },

    update: {
        errors: {},
        data: {},
        loading: false,
    },

    delete: {
        data: {},
        errors: {},
        loading: false,
        isDeleted: false,
    },

    updatePublicStatus: {
        errors: {},
        loading: false,
        id: null,
    },
};

export default initialState;
