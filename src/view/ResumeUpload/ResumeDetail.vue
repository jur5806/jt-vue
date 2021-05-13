<template>
    <div class="warp-outer">
      <div class="job-header">
        章某某
      </div>
      <div class="job-info">
        <span>
          浙江财经大学东方学院
        </span>
        <div class="line-devider"></div>
        <span>
          信息管理与信息系统
        </span>
        <div class="line-devider"></div>
        <span>
          运营助理
        </span>
        <div class="line-devider"></div>
      </div>
      <div class="block-title">
        基本信息
      </div>
      <div class="block-content">{{content1}}</div>
      <div class="block-content">{{content2}}</div>
      <div class="block-content">专业技能：英语六级、计算机二级、软考中级、很能干饭</div>
      <div class="block-title">
        自我介绍以及荣誉
      </div>
      <div class="block-content">{{content3}}</div>
      <div class="block-content">{{content4}}</div>
      <div class="block-content">{{content5}}</div>
      <div class="apply-block">
        <button type="button" class="apply-block-applyBtn">
          <span>简历通过</span>
        </button>
        <button type="button" class="apply-block-applyBtn">
          <span>面试通过</span>
        </button>
        <button type="button" class="apply-block-applyBtn">
          <span>成功聘用</span>
        </button>

      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      content1: "电子邮箱：1203333333@qq.com",
      content2: "联系电话：13568687575",
      content3: "1，我什么都会，我很能加班！！！年轻人，要的就是活力",
      content4: "2，我学习能力很强",
      content5: "3，我会好多种编程语言",
      // content6: "",
    }
  }
}
</script>
<style scoped lang="scss">
.warp-outer {
  font-size: 16px;
  max-width: 800px;
  min-height: 573px;
  margin: 60px auto 110px;
  padding-left: 32px;
}
.job-header {
  margin-bottom: 13px;
  position: relative;
  font-size: 30px;
  font-weight: 800;
  color: #1f2329;
}
.line-devider {
  display: inline-block;
  width: 1px;
  height: 12px;
  background-color: #c3c6cb;
  margin: 0 8px;
}
.block-title {
  margin: 50px 0 8px;
  font-size: 21px;
  line-height: 1.52;
  font-weight: 800;
  color: #3e4c5b;
}
.block-content {
  line-height: 2em;
  white-space: pre;
  white-space: pre-line;
  word-break: break-word;
  font-size: 14px;
  color: #3e4c5b;
}
.apply-block {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin: 50px 0;
  line-height: 40px;
  height: 40px;
}
.apply-block-applyBtn {
  color: #fff;
  background-color: #325ab4;
  border-color: #325ab4;
  max-width: 120px;
  height: 40px;
  padding: 0 12px;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 48px;
  min-width: 120px;
  text-align: center;
  border: 1px solid rgba(0,0,0,0);
  display: inline-block;
  position: relative;
}

.apply-block-applyBtn:after {
  content: "";
  display: block;
  border-top: 20px solid transparent;
  border-bottom: 19px solid transparent;
  border-left: 19px solid #325ab4;
  position: absolute;
  right: -19px;
  top: 0px
}

.apply-block-applyBtn:before{  
    content: '';
    display: block;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #f0f3f6;
    position: absolute;
    left: -1px;
    top: 0;
}
</style>
