// Initial state is the place you define all initial values for the Redux store of the feature.
import helpers from "@ultis/helpers";

const initialState = {
    browserFullScreen: {
        isActive: window.innerHeight === window.screen.height
    },
    fullScreen       : {
        isActive : false,
        elementId: '',
        class    : '',
    },
    siderCollapsed   : false,
    randomColor      : helpers.getRandomColor(),
    timeZone         : -(new Date().getTimezoneOffset() / 60),
    searchData       : {
        loading      : false,
        sites        : [],
        displayMenu  : false,
        portfolioList: [],

        // Data of search box
        portfolioIdSelected: null,
        siteIdSelected  : null,
        plantIdSelected : null,
    },
};

export default initialState;
