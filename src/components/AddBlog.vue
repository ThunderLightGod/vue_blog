<template>
  <div class="add-blog">
    <el-form class="blogform" ref="blogForm" :rules="rules" :model="blogForm" label-width="80px">
      <el-form-item label="博客标题" prop="title">
        <el-input type="text" placeholder="请输入博客标题" v-model="blogForm.title" required></el-input>
      </el-form-item>
      <el-form-item label="博客摘要" prop="desc">
        <el-input type="text" placeholder="请输入博客摘要" v-model="blogForm.desc" required></el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content" class="textarea">
        <el-input type="textarea" v-model="blogForm.content" required></el-input>
      </el-form-item>
      <el-form-item label="博客分类" prop="categories">
        <el-checkbox-group v-model="blogForm.categories">
          <el-checkbox label="Vue.js"></el-checkbox>
          <el-checkbox label="Node.js"></el-checkbox>
          <el-checkbox label="React.js"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">{{isEdit ? '保存修改' : '添加博客'}}</el-button>
      </el-form-item>
    </el-form>
    <div class="markdown">
      <h3>博客预览</h3>
      <Vue-markdown :v-html="false" v-highlight class="content" :source="blogForm.content"></Vue-markdown>
    </div>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import {getCookie} from '../javascript/cookie'
export default {
  name: 'add-blog',
  data () {
    return {
      isEdit: false,
      id: this.$route.params.id,
      blogForm: {
        title: '',
        desc: '',
        content: '',
        categories: [],
        author: '',
        dete: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入博客标题', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入博客摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' }
        ],
        categories: [
          { type: 'array', required: true, message: '请至少选择一个博客分类', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    VueMarkdown: VueMarkdown
  },
  created () {
    this.author = getCookie('userName')
    if (this.id !== '' && this.id !== undefined) {
      let params = {
        id: this.id
      }
      this.$http.get('api/blogList', {params: params}).then((res) => {
        this.blogForm = res.body[0]
        this.isEdit = true
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    }
  },
  methods: {
    onSubmit () {
      this.$refs.blogForm.validate((valid) => {
        if (valid) {
          let data = {
            title: this.blogForm.title,
            desc: this.blogForm.desc,
            content: this.blogForm.content,
            categories: this.blogForm.categories,
            date: new Date(),
            author: this.author
          }
          if (this.isEdit) {
            this.$http.patch('api/blogList/' + this.id, data).then((res) => {
              // 提示添加成功
              this.$message.success('博客修改成功！')
              // 清空数据项
              this.blogForm = {
                title: '',
                desc: '',
                content: '',
                categories: []
              }
              this.$refs.blogForm.resetFields()
              this.$router.push({path: '/BlogBe/BlogManager'})
            }).catch(err => {
              this.$message.error(err.data.message)
            })
          } else {
            this.$http.post('api/blogList', data).then((res) => {
              // 提示添加成功
              this.$message.success('博客添加成功！')
              // 清空数据项
              this.blogForm = {
                title: '',
                desc: '',
                content: '',
                categories: []
              }
              this.$refs.blogForm.resetFields()
              this.$router.push({path: '/BlogBe/BlogManager'})
            }).catch(err => {
              this.$message.error(err.data.message)
            })
          }
        } else {
          this.$message.warning('请填写完整信息！')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-blog {
  min-height: 500px;
  width: 1000px;
  margin: 30px auto;
  overflow: hidden;
  padding-left: 40px;
  .blogform {
    width: 45%;
    float: left;
    margin-top: 36px;
  }
  .markdown {
    float: left;
    width: 45%;
    margin: 0 0 0 40px;
    h3 {
      margin: 0;
      padding-bottom: 12px;
      text-align: center;
      border-bottom: 1px dotted #bbb;
    }
    .content {
      min-height: 200px;
      border: 1px dotted #eee;
      margin-top: 20px;
    }
  }
}
@media screen and (max-width: 769px) {
  .add-blog {
    width: 100%;
    margin: 30px auto;
    padding-left: 0;
    .blogform {
      width: 100%;
      float: left;
    }
    .markdown {
      float: left;
      width: 100%;
      margin: 0;
      padding-top: 50px;
      border-top: 2px dotted #999;
    }
  }
}
</style>
