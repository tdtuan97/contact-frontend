const initialState = {
    list: {
        data      : [],
        pagination: {
            current : 1,
            pageSize: 25,
            total   : 0,
        },
        loading   : false,
    },

    detail: {
        errors      : {},
        data        : {},
        loading     : false,
        id          : null,
        isFound     : true,
        modalVisible: false,

        update: {
            modalVisible: false,
            loading     : false,
        },
    },

    delete: {
        errors      : {},
        modalVisible: false,
        loading     : false,
        isDeleted   : false,
    },
};

export default initialState;
