<template>
  <div class="login-wrap">
    <h3 v-if="!showRegister">登录</h3>
    <h3 v-if="showRegister">注册</h3>
    <el-form class="form" ref="accountForm" label-width="80px" :model="account" :rules="rules" status-icon>
      <el-form-item  label="账号" prop="userName">
        <el-input type="text" v-model="account.userName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="account.passWord"  placeholder="请输入密码"></el-input>
      </el-form-item >
      <el-form-item label="确认密码" prop="checkPassWord" v-if="showRegister">
        <el-input type="password" v-model="account.checkPassWord" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" v-if="!showRegister" @click="login">登录</el-button>
        <el-button type="primary" v-if="showRegister" @click="register">注册</el-button>
        <br />
        <span v-if="!showRegister" @click="switchRegister">没有账号？马上注册</span>
        <span v-if="showRegister" @click="switchLogin">已有账号？马上登录</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getCookie, setCookie} from '../javascript/cookie'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.account.checkPassWord && this.account.checkPassWord !== '') {
          this.$refs.accountForm.validateField('checkPassWord')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.account.passWord) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    var checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号名称'))
      }
      if (this.showRegister && value !== '') {
        let params = {
          userName: this.account.userName
        }
        this.$http.get('api/userList', {params: params}).then(res => {
          if (res.body.length === 1) {
            callback(new Error('该名称已被使用！'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
    return {
      showRegister: false,
      account: {
        userName: '',
        passWord: '',
        checkPassWord: ''
      },
      rules: {
        userName: [
          {required: true, validator: checkUserName, trigger: 'blur'}
        ],
        passWord: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPassWord: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    if (getCookie('userName')) {
      this.$router.push({path: '/'})
    }
  },
  methods: {
    switchRegister () {
      this.showRegister = !this.showRegister
      this.$refs.accountForm.resetFields()
      this.account.userName = ''
      this.account.passWord = ''
    },
    switchLogin () {
      this.showRegister = !this.showRegister
      this.$refs.accountForm.resetFields()
      this.account.userName = ''
      this.account.passWord = ''
      this.account.checkPassWord = ''
    },
    login () {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          let params = {
            userName: this.account.userName
          }
          this.$http.get('api/userList', {params: params}).then(res => {
            if (res.body.length === 0) {
              this.$message.warning('该用户不存在！')
            } else if (res.body[0].passWord !== this.account.passWord) {
              this.$message.warning('密码不正确！')
            } else {
              setCookie('userName', res.body[0].userName, 1000 * 60)
              setCookie('userId', res.body[0].id, 1000 * 60)
              this.$store.commit('changeLogin', {bool: true})
              if (this.$store.state.routerPath === '') {
                this.$router.push('/BlogBe/BlogManager')
              } else {
                setInterval(() => {
                  this.$store.commit('saverouterPath', {path: ''})
                }, 0)
                this.$router.push(this.$store.state.routerPath)
              }
            }
            this.$refs.accountForm.resetFields()
            this.account.userName = ''
            this.account.passWord = ''
          }).catch(err => {
            this.$message.error(err.data.message)
          })
        } else {
          this.$message.warning('请填写完整信息！')
        }
      })
    },
    register () {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          let params = {
            userName: this.account.userName,
            passWord: this.account.passWord
          }
          this.$http.post('api/userList', params).then(res => {
            setCookie('userName', res.body.userName, 1000 * 60)
            setCookie('userId', res.body.id, 1000 * 60)
            this.$store.commit('changeLogin', {bool: true})
            if (this.$store.state.routerPath === '') {
              this.$router.push('/BlogBe/BlogManager')
            } else {
              setInterval(() => {
                this.$store.commit('saverouterPath', {path: ''})
              }, 0)
              this.$router.push(this.$store.state.routerPath)
            }
            this.$refs.accountForm.resetFields()
            this.account.userName = ''
            this.account.passWord = ''
            this.account.checkPassWord = ''
          }).catch(err => {
            this.$message.error(err.data.message)
          })
        } else {
          this.$message.warning('请填写完整信息！')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 400px;
  margin: 227.5px auto;
  .form {
    margin-right: 40px;
  }
  h3 {
    text-align: center;
    margin-left: 40px;
  }
  .btn {
    text-align: center;
    button {
      width: 60%;
    }
  }
}
@media screen and (max-width: 769px) {
  .login-wrap {
    width: 100%;
    margin: 90px auto;
    h3 {
      margin-left: 0px;
    }
  }
}
</style>
