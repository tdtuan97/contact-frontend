import {notification, message as AntMessage} from 'antd';

export const pushNotification = (type, message = '', description = '') => {
    const types = ['success', 'info', 'warning', 'error']
    type        = types.indexOf(type) === -1 ? 'info' : type;

    notification[type]({
        message    : message,
        description: description,
    });
};

export const pushMessageSuccess = (message) => {
    message = message ?? 'Success.'
    AntMessage.success(message);
};

export const pushMessageError = (message) => {
    message = message ?? 'Sorry, have problem in processing.'
    AntMessage.error(message);
};

export const pushMessageLoading = () => {
    const hide = AntMessage.loading('Processing...', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 500);
}

export default pushNotification