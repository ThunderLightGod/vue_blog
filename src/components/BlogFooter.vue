<template>
  <div class="footer">
    <ul class="share-group">
      <li>GitHub</li>
      <li>WelCome</li>
      <li>CSDN</li>
    </ul>
    <div class="copy">
      &copy; lxp - 2018 - 04 -12
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  background: #333;
  color: #fff;
  min-height: 200px;
  text-align: center;
  ul {
    &.share-group {
      display: block;
      max-width: 1000px;
      margin: 0 auto;
      padding: 30px 0;
      &.share-group li {
        display: inline-block;
        padding: 10px;
      }
    }
  }
}
.copy {
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;
}
@media screen and (max-width: 769px) {
 .footer {
    min-height: 100px;
    ul {
      &.share-group {
        width: 100%;
        padding: 15px 0;
      }
    }
  }
  .copy {
    width: 100%;
  }
}
</style>
