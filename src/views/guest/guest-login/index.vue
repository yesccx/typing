<!-- 游客登录页 -->
<template>
    <div class="view-guest-login">
        <el-form ref="user" :model="user" :rules="userRules">
            <h2 class="user-title">
                Typing <el-tag size="mini" type="danger">Beta</el-tag>
            </h2>
            <el-form-item prop="username">
                <el-input v-model="user.username" placeholder="请输入用户名/邮箱账号" prefix-icon="el-icon-user" auto-complete="off"
                    @keydown.enter.native="onLogin" clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="user.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock" type="password"
                    @keydown.enter.native="onLogin" show-password clearable>
                </el-input>
            </el-form-item>
            <el-button :loading="submitLoading" class="inline-block" type="primary" @click="onLogin">登录</el-button>
            <div class="user-actions">
                <el-button type="text" @click="onWillRegister">立即注册?</el-button>
                <el-button type="text" @click="onWillRetrieve">忘记密码?</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import BaseView from '@/mixins/common/base-view';

    export default {
        name: 'view-guest-login',
        mixins: [BaseView],
        data() {
            return {
                userRules: {
                    username: [{ required: true, message: '请输入用户名/邮箱账号', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
                },
                user: {
                    username: '',
                    password: ''
                },
                submitLoading: false
            };
        },
        methods: {
            // 提交登录
            async submitLogin() {
                await this.checkValidate('user');
                await this.$api.guest.login(this.user, {
                    loading: status => { this.submitLoading = status; }
                }).then(({ data }) => {
                    this.$notify.success({ title: '登录成功', message: '欢迎回来' });
                    this.userSession(data);
                    this.goRedirect();
                });
            },
            // 跳转回登录前访问的页面
            goRedirect() {
                const redirect = this.$route.query.r;
                if (redirect) {
                    this.$router.push(redirect);
                } else {
                    this.$link.home();
                }
            },
            // 用户会话状态保存
            userSession(sessionData) {
                this.$store.commit('userSession/setSession', sessionData);
            },
            // 事件：提交登录
            onLogin() {
                this.submitLogin();
            },
            // 事件：前往用户注册
            onWillRegister() {
                this.$link.guestRegister();
            },
            // 事件：前往用户找回密码
            onWillRetrieve() {
                this.$utils.Abuilding();
            }
        }
    };
</script>

<style lang="scss">
    .view-guest-login {
        .user-actions .el-button--text {
            color: $--color-primary-light-3;
        }
    }
</style>

<style lang="scss" scoped>
    .view-guest-login {
        width: 350px;
        margin: 0 auto;
        background: #ffffff;
        padding: 25px;
        border-radius: 10px;
        margin-top: 25vh;
        box-shadow: 0 2px 12px 0 rgba(122, 122, 122, 0.19);
    }

    .user-actions {
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }

    .user-title {
        text-align: center;
        margin-top: 0;

        .el-tag {
            position: relative;
            bottom: 3px;
            left: 5px;
        }
    }
</style>
