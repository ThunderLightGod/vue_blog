<template>
  <div class="comment-box">
    <h3>评论</h3>
    <p v-if="commentList.length === 0">暂无评论，快来抢沙发</p>
    <div v-else>
      <div class="comment" v-for="commentItem in commentList" :key="commentItem.id">
        <b>{{commentItem.name}}<span>{{commentItem.date | formatDate}}</span></b>
        <p @click="changeCommenter(commentItem.name, commentItem.id)">
          <vue-markdown :v-html="false" class="content" v-highlight :source="commentItem.commentContent"></vue-markdown>
        </p>
        <div v-if="commentItem.replay.length > 0">
          <a class="show-replay" @click="changeReplay(commentItem.id)"><i class="el-icon-view"></i>&nbsp;{{commentItem.id === showReplayId ? '收回评论' : '查看评论'}}</a>
          <div class="replay" v-for="replayItem in commentItem.replay" :key="replayItem.id" v-if="commentItem.id === showReplayId">
            <b v-if="replayItem.responder">&nbsp;&nbsp;回复&nbsp;&nbsp;{{replayItem.reviewers}}
              <span>{{replayItem.date | formatDate}}</span>
            </b>
            <b v-else>
              {{replayItem.responder}}追加回复
              <span>{{replayItem.date | formatDate}}</span>
            </b>
            <p @click="changeCommenter(replayItem.responder, commentItem.id)">
              <vue-markdown :v-html="false" class="content" v-highlight :source="replayItem.commentContent"></vue-markdown>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-box" v-if="isLogin">
      <h3>发表评论</h3>
      <b v-if="type === 1">你回复&nbsp;{{name}}</b>
      <b v-if="type === 2">追加评论</b>
      <textarea value="请填写评论内容" v-model="commentText"></textarea>
      <el-button class="btn" type="primary" @click="cancelComment">取消</el-button>
      <el-button class="btn" type="primary" @click="addComment">发表</el-button>
    </div>
    <div v-else>
      <div class="prompt">只有&nbsp;
        <a @click="toLogin">登录</a>
        &nbsp;后才能评论哦
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '../javascript/formatDate'
import vueMarkdown from 'vue-markdown'
export default {
  data () {
    return {
      commentText: '',
      showReplayId: -1
    }
  },
  props: {
    commentList: {
      type: Array,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isLogin: {
      type: Boolean,
      required: true
    }
  },
  components: {
    vueMarkdown: vueMarkdown
  },
  methods: {
    changeReplay (commentId) {
      if (this.showReplayId === commentId) {
        this.showReplayId = -1
      } else {
        this.showReplayId = commentId
      }
    },
    changeCommenter (name, commentId) {
      this.showReplayId = commentId
      this.$emit('change', name, commentId)
    },
    cancelComment () {
      this.$emit('cancel')
      this.commentText = ''
    },
    addComment () {
      this.$emit('submit', this.commentText)
      this.commentText = ''
    },
    toLogin () {
      this.$store.commit('saverouterPath', {path: this.$router.history.current.fullPath})
      this.$router.push({path: '/BlogLogin'})
    }
  },
  filters: {
    formatDate (value) {
      var date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-box {
  h3 {
    color: #634322;
    background: #e9e5df;
    padding: 8px 15px;
    text-align: left;
    font-size: 16px;
  }
  .comment {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 2px dotted #01553d;
    b {
      color: #01553d;
      font-size: 16px;
      display: block;
      margin: 5px 0;
      span {
        color: #333;
        font-size: 14px;
        margin-left: 20px;
      }
    }
    p {
      font-size: 16px;
      color: #333;
      background: #fff;
      padding: 1px 20px;
      border-radius: 8px;
      margin: 0 45px;
      &:hover {
        cursor: pointer;
      }
    }
    .show-replay {
      position: relative;
      top:7px;
      left: 45px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    .replay {
      margin: 15px 0 15px 50px;
    }
  }
  textarea {
    overflow: auto;
    width: 98%;
    height: 95px;
    outline: none;
    resize: none;
  }
  .btn {
    float: right;
    margin: 3px 30px 0 12px;
  }
}
.prompt {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  a {
    color: red;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 1025px) {
  .comment-box {
    .btn {
      margin: 23px 30px 0 12px;
    }
  }
}
</style>
