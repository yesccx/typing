// 游客标识（持有该标识时，必需在未登录状态）
export const PERMISSION__GUEST = { auth: 0 };

// 正常用户标识（持有该标识时，必需在登录状态）
export const PERMISSION__USER = { auth: 1 };

// 公开标识（持有该标识时，没有限制）
export const PERMISSION__PUBLIC = { auth: 2 };