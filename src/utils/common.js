import Env from '@/core/config/env';
import Router from '@/router';

// 设置页面标题
export const SetDocummentTitle = (title) => {
    let prefix = Env.VUE_APP_TITLE_PREFIX;
    prefix = prefix ? `${prefix}-` : '';

    document.title = `${prefix}${title}`;
};

// 获取URL参数（类似tp5的input）
export const Input = (field, defaultValue = '') => {
    let key = ''; // 参数名
    let type = ''; // 参数类别 d(int) s(string)
    [key, type = ''] = field.split('/');

    // 获取参数，不存在时取默认值
    let value = Router.app.$route.query[key] || defaultValue;
    // 转换类型
    switch (type) {
        case 'd':
            value = parseInt(value, 10);
            break;
        case 's':
            value = String(value);
            break;
        default:
            break;
    }

    return value;
};