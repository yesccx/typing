import { Message } from 'element-ui';
import _ from 'lodash';

const Tip = (option = {}) => {
    const defaultOpt = {
        showClose: true
    };
    return Message({ ...defaultOpt, ..._.cloneDeep(option) });
};

export default {
    success(message) {
        return Tip({ message, type: 'success' });
    },
    error(message) {
        return Tip({ message, type: 'error' });
    },
    warning(message) {
        return Tip({ message, type: 'warning' });
    },
    info(option) {
        return Tip(option);
    }
};