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

    export: {
        data: [],
        loading: false,
    },

    import: {
        data: [],
        errors: {},
        loading: false,
    },

    upload: {
        filename: null,
    },

    shared: {
        errors: {},
        data: {},
        loading: false,
    },

    sharedUserList: {
        data: [],
        loading: false,
    },

    sharedUserUpdate: {
        isUpdated: false,
        loading: false,
    },
};

export default initialState;
