import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import historyCommon from "./historyCommon";
import {reducer as CrudReducer} from "./crud/reducer"
import {reducer as CommonReducer} from "@features/Common/redux/reducer"
import {reducer as AuthReducer} from "@features/Auth/redux/reducer"
import {reducer as DashboardReducer} from "@features/Dashboard/redux/reducer"
//import {reducer as socketIOReducer} from "./socketIO/reducer"

import {i18nextReducer} from 'i18next-redux-languagedetector';

const reducerMap = {
    i18next: i18nextReducer,
    router: connectRouter(historyCommon),
    //socketIO           : socketIOReducer,
    common: CommonReducer,
    crud: CrudReducer,
    auth: AuthReducer,
    dashboard: DashboardReducer,
};

export default combineReducers(reducerMap);
