<template>
  <div id="single-blog">
    <h2>{{blog.title}}</h2>
    <h4>
      <span class="author">作者：{{blog.author}}</span>
      <span class="date">作者：{{blog.date}}</span>
    </h4>
    <div>
      <article>
        <vue-markdown :v-html="false" class="content" v-highlight :source="blog.content"></vue-markdown>
      </article>
    </div>
    <blog-comment
    @change="changeCommenter"
    @cancel="cancelComment"
    @submit="addComment"
    :isLogin="isLogin"
    :type="type"
    :name="reviewerName"
    :commentList="commentList">
    </blog-comment>
  </div>
</template>
<script>
import BlogComment from './BlogComment.vue'
import vueMarkdown from 'vue-markdown'
import {formatDate} from '../javascript/formatDate'
import {getCookie} from '../javascript/cookie'
export default {
  data () {
    return {
      id: this.$route.params ? this.$route.params.id : '1',
      blog: {},
      reviewerName: '',
      type: 0, // 0为评论作者，1为评论别人，2为追加评论
      closeId: -1,
      commentList: [],
      isLogin: false
    }
  },
  components: {
    vueMarkdown: vueMarkdown,
    BlogComment: BlogComment
  },
  mounted () {
    this.isLogin = this.$store.state.isLogin
    let params = {
      id: this.id
    }
    this.$http.get('api/blogList', {params: params}).then(res => {
      this.blog = res.body[0]
      this.blog.date = formatDate(new Date(res.body[0].date), 'yyyy-MM-dd hh:mm')
      params = {
        blogId: this.blog.id
      }
      return this.$http.get('api/commentList', {params: params})
    }).then(res => {
      this.commentList = res.body
    }).catch(err => {
      this.$message.error(err.date.message)
    })
  },
  methods: {
    addComment (commentText) {
      if (commentText === '') {
        this.$message.warning('请填写评论！')
        return false
      }
      let params = {}
      if (this.type === 0) {
        params = {
          name: getCookie('userName'),
          date: new Date(),
          blogId: this.blog.id,
          commentContent: commentText,
          replay: []
        }
        this.$http.post('api/commentList', params).then(res => {
          this.commentList.push(res.body)
        })
      } else {
        let commentIndex = this.commentList.findIndex(this.findCommentListIndex)
        this.commentList[commentIndex].replay.push({
          responder: getCookie('userName'),
          reviewers: this.reviewerName,
          date: new Date(),
          commentContent: commentText
        })
        this.type = 0
        this.$http.put('api/commentList/' + this.commentList[commentIndex].id, this.commentList[commentIndex]).then(res => {
          // 要完善
        })
      }
    },
    findCommentListIndex (element) {
      return element.id === this.closeId
    },
    changeCommenter (name, commentId) {
      this.reviewerName = name
      this.closeId = commentId
      if (name === getCookie('userName')) {
        this.type = 2
      } else {
        this.type = 1
      }
    },
    cancelComment () {
      this.type = 0
    }
  }
}
</script>
<style lang="scss" scoped>
#single-blog {
  width: 1000px;
  margin: 50px auto;
  padding: 50px;
  background: #eee;
  border: 1px dotted #aaa;
  border-radius: 15px;
  h2 {
    border-left: 3px solid #888;
    padding-left: 10px;
  }
  h4 {
    padding-bottom: 20px;
    border-bottom: 2px dotted #abc;
    .date {
      float: right;
      display: inline-block;
      margin-right: 40px;
    }
  }
}
@media screen and (max-width: 1025px) {
  #single-blog {
    width: 90%;
    padding: 20px;
    border: none;
    border-radius: 0px;
    .date {
      margin-right: 0px;
    }
  }
}
</style>
