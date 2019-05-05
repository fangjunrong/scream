<template>
  <div class="ieUpdate">
    您的浏览器需要升级了
    <div class="wrap">
      <p class="title">您的浏览器需要更新,请下载一款免费而优秀的最新版浏览器。</p>
      <!-- 用table,为了兼容 ie5 -->
      <table class="list">
        <tr>
          <td class="item">
            <a class="link bf" href="http://www.mozilla.com/firefox/" target="_blank">
              <span class="name">Firefox</span>
              <span class="vendor">Mozilla Foundation</span>
            </a>
          </td>
          <td class="item">
            <a class="link bo" href="http://www.opera.com/zh-cn" target="_blank">
              <span class="name">Opera</span>
              <span class="vendor">Opera Software</span>
            </a>
          </td>
          <td class="item">
            <a class="link bc" href="http://www.google.cn/chrome/browser/desktop/index.html" target="_blank">
              <span class="name">Chrome</span>
              <span class="vendor">Google</span>
            </a>
          </td>
          <td class="item">
            <a class="link bi" href="http://windows.microsoft.com/en-HK/internet-explorer/download-ie" target="_blank">
              <span class="name">Internet Explorer Edge</span>
              <span class="vendor">Microsoft</span>
            </a>
          </td>
        </tr>
      </table>
      <p class="tag">带来更多安全、极速和乐趣。</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IeUpdate'
}
</script>
<style lang='scss' scoped>
  .wrap{
    min-width: 1024px;
    margin: 47px 20px;
    background-color: #fff4f4;
    border: solid 1px #777;
    box-shadow: 0 0 8px #888;
    position: relative;
  }
  .wrap .title{
    text-align: center;
    margin: 13px 25px;
    font-weight: bold;
    font-size: 19px;
  }
  .wrap .list{
    width: 100%;
    margin-bottom: 10px;
  }
  .wrap .list .item{
    border: 1px dashed #fff4f4;
    text-align: center;
    padding: 10px;
    width: 25%;
  }
  .wrap .list .item:hover .link{
    border: dashed 1px rgb(170, 170, 170);
    padding-top: 109px;
    padding-bottom: 3px;
  }
  .wrap .list .item .link{
    border: 1px dashed #fff4f4;
    padding-top: 110px;
    padding-bottom: 4px;
    background-position: center top;
    background-repeat: no-repeat;
    display: block;
    text-decoration: none;
  }
  .wrap .list .item .bf{
    background-image: url('../../../assets/ieupdate/ff.png');
  }
  .wrap .list .item .bo{
    background-image: url('../../../assets/ieupdate/op.png');
  }
  .wrap .list .item .bc{
    background-image: url('../../../assets/ieupdate/ch.png');
  }
  .wrap .list .item .bi{
    background-image: url('../../../assets/ieupdate/ie.png');
  }
  .wrap .list .item .link .name{
    color: #e25600;
    text-align: center;
    text-decoration: underline;
    font-size: 19px;
    font-family: 'Open Sans',sans-serif;
    font-weight: 300;
  }
  .wrap .list .item .link .vendor{
    font-size: 10px;
    color: #aaa;
    text-align: center;
    display: block;
    margin-top: 5px;
    text-decoration: none;
  }
  .wrap .tag {
    text-align: center;
    margin: 13px 25px;
    font-size: 19px;
    font-family: 'Open Sans',sans-serif;
    font-weight: 300;
  }
</style>
