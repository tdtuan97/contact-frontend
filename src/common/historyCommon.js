import {createBrowserHistory} from 'history';

// A singleton history object for easy API navigation
const historyCommon = createBrowserHistory();
//const historyCommon = createBrowserHistory({ basename: '/ziot' });
export default historyCommon;