/*
 * Router Link Collect
 *
 * @Created: 2021-04-12 09:57:25
 * @Author: yesc (yes.ccx@gmail.com)
 */

import * as RouterLinks from '@/router/kernel/router-links';

const RouterLinkCollection = {};

// 遍历api文件，收集apiCall
RouterLinks && Object.keys(RouterLinks).forEach(key => {
    // 提取link名称
    const linkInfo = key.match(/^RouterLink(.+)$/);
    if (!linkInfo) {
        return true;
    }

    // key名格式化
    let linkName = linkInfo[1];
    linkName = linkName.replace(/^([A-Z])/, (v) => (v.toLowerCase()));

    RouterLinkCollection[linkName] = RouterLinks[key];
});

export default RouterLinkCollection;