<template>
    <div>
        <div class="fiexd">
            <p class="title">生活信息管理</p>
            <el-form :label-position="labelPosition" status-icon :rules="rules" ref="loginForm" :model="loginForm">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" id="username" ref="username"
                              v-model="loginForm.username" placeholder="请输入登录账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :show-password="true" prefix-icon="el-icon-lock" ref="password"
                              v-model="loginForm.password" placeholder="请输入账号密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login">
                <el-button type="primary" @click="userLogin('loginForm')" style="width: 100%;margin:10px 0;    letter-spacing: 10px;">登   录</el-button>
                <el-button @click="userRegister" style="width: 100%;margin: 10px 0;    letter-spacing: 10px;">注   册</el-button>
            </div>
        </div>
        <div>
            <el-dialog title="用户注册" :visible.sync="userRegisterDialog" center>
                <el-form :model="ruleForm" status-icon :rules="rulesDialog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="登录账号" prop="username">
                        <el-input v-model="ruleForm.username" ref="username"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname" ref="nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" ref="pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            var validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录账号不能为空'));
                }
            };
            var validateNickname = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户昵称不能为空'));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                userRegisterDialog: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ]
                },
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rulesDialog: {
                    pass: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            userLogin(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let username = this.$refs.username.value;
                        let password = this.$refs.password.value;
                        let url = this.GLOBAL.baseURL + `/login`
                        let data = {username:username,password:password}
                        axios.post(url,data).then((res) => {
                            console.log(res.data)
                            if(res.data.code === "200"){
                                // 设置token全局变量
                                sessionStorage.setItem("token",res.data.data.token);
                                sessionStorage.setItem("nickName",res.data.data.nickname);
                                this.successLogin();
                                this.$router.push({path:'/home'})
                            }
                            if(res.data.code === "205"){
                                this.$notify.error({
                                    title: '错误',
                                    message: res.data.fail,
                                    position:'bottom-right'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            successLogin(){
                this.$notify({
                    title: '登录成功',
                    type: 'success',
                    position:'bottom-right',
                    customClass:'zidingyi'
                });
            },
            successSave(){
                this.$notify({
                    title: '注册成功',
                    type: 'success',
                    position:'bottom-right',
                    customClass:'zidingyi'
                });
            },
            userRegister(){
                this.userRegisterDialog = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let username = this.$refs.username.value;
                        let password = this.$refs.pass.value;
                        let nickname = this.$refs.nickname.value;
                        console.log(username)
                        console.log(password)
                        console.log(nickname)
                        let url = this.GLOBAL.baseURL +  `/user/save`
                        let data = {username:username,password:password,nickname:nickname}
                        axios.post(url,data).then((res) => {
                            console.log(res.data)
                            if(res.data.code === "200"){
                                this.successSave();
                                this.userRegisterDialog = false;
                            }
                            if(res.data.code === "205"){
                                this.$notify.error({
                                    title: '错误',
                                    message: res.data.fail,
                                    position:'bottom-right'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .fiexd{
        width: 400px;
        height: 370px;
        position: fixed;
        top: calc(50% - 275px);
        background: white;
        padding: 20px 20px 20px 20px;
        box-sizing: border-box;
        right: 100px;
        border-radius:15px;
    }
    .title{
        height: 40px;
        line-height: 60px;
        /*border-bottom: 1px solid #ccc;*/
        margin: 0 0 30px 0;
        color: #222;
        text-align: center;
        font-size: 25px;
    }

    /*/deel/.zidingyi{*/
    /*    width: 100px;*/
    /*}*/
</style>
<style>
    .zidingyi{
        width: 200px;
    }
</style>