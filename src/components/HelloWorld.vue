<template>
  <div>
    <date-picker v-model="myInput"></date-picker>
    <!--   :controls="true"  -->
    <!-- <el-input-number  controls-position="right" v-model="elnum" :min="-10" :max="10" :step="1" ></el-input-number><br />
    element控件：{{elnum}}<br/>
    <input-number  controls-position="right" v-model="mynum" :min="-10" :max="10" :step="1.2333"></input-number><br />
    模仿element控件：{{mynum}} -->
    <!-- <menujd :menuData="menuData"></menujd> -->
    <star></star>
    <!-- <button @click="toshow">点击切换子组件显示</button>
    <component v-bind:is="which_to_show"></component> -->
    <!-- <img v-img src="/static/images/apic23847_sc115.com.jpg" alt="山水一色"> -->
  </div>
</template>

<script>
// import menujd from './MenuJD.vue'
import star from './Star.vue'
import inputNumber from './InputNumber.vue'
import datePicker from './datePicker.vue'
export default {
  data () {
    return {
      elnum: 0,
      mynum: 0,
      myInput: ''
      // menuData: [
      //   {
      //     menuList: '一级导航1',
      //     menuListData: [
      //       {
      //         menuListTitle: '二级菜单1',
      //         menuListDetail: ['三级菜单1', '三级菜单2', '三级菜单3']
      //       },
      //       {
      //         menuListTitle: '二级菜单2',
      //         menuListDetail: ['三级菜单1', '三级菜单2', '三级菜单3']
      //       }
      //     ]
      //   },
      //   {
      //     menuList: '一级导航2',
      //     menuListData: [
      //       {
      //         menuListTitle: '二级菜单21',
      //         menuListDetail: ['三级菜单21', '三级菜单22', '三级菜单23']
      //       },
      //       {
      //         menuListTitle: '二级菜单22',
      //         menuListDetail: ['三级菜单21', '三级菜单22', '三级菜单23']
      //       }
      //     ]
      //   }
      // ],
      // which_to_show: 'first'
    }
  },
  methods: {
    // toshow: function () {
    //   let arr = ['first', 'second', 'third']
    //   let index = arr.indexOf(this.which_to_show)
    //   if (index < arr.length - 1) {
    //     this.which_to_show = arr[index + 1]
    //   } else {
    //     this.which_to_show = arr[0]
    //   }
    // }
  },
  components: {
    datePicker,
    inputNumber,
    // menujd
    star
    // first: {
    //   template: '<div>这里是子组件1</div>'
    // },
    // second: {
    //   template: '<div>这里是子组件2</div>'
    // },
    // third: {
    //   template: '<div>这里是子组件3</div>'
    // }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
