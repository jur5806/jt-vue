<template>
    <div class="warp-outer">
      <el-button type="primary" size="mini" @click="$router.go(-1)" style="margin: 10px">返回</el-button>
      <div class="job-header">
        {{detailInfo.recommendedName || "章某某"}}
      </div>
      <div class="job-info">
        <span>
          {{ detailInfo.recommendedSchool ||"浙江财经大学东方学院"}}
        </span>
        <div class="line-devider"></div>
        <span>
          {{ detailInfo.recommendedMajor || "信息管理与信息系统"}}
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
      <div class="block-content">联系电话：{{detailInfo.recommendedTelephone}}</div>
      <div class="block-content">电子邮箱：{{detailInfo.recommendedEmail}}</div>
      <div class="block-content">籍贯：{{detailInfo.recommendedProvince}}</div>
      <div class="block-content">专业技能：英语六级、计算机二级、软考中级、很能干饭</div>
      <div class="block-title">
        自我介绍以及荣誉
      </div>
      <div class="block-content">{{detailInfo.recommendedSelfEvaluation}}</div>
      <div class="block-content">{{content4}}</div>
      <div class="block-content">{{content5}}</div>

      <p style="margin:10px 0;color:#0F8FFF;cursor: pointer;" @click="openImg(detailInfo.recommendedPhoto)">{{detailInfo.recommendedPhoto}}</p>
      <!-- <img :src="detailInfo.recommendedPhoto" alt="" @click="downImg(detailInfo.recommendedPhoto)"> -->
      <div class="apply-block">
        <button type="button" class="apply-block-applyBtn">
          <span>hr初审通过</span>
        </button>
        <button type="button" :class="detailInfo.approvalState > 0 ? 'apply-block-applyBtn' : 'apply-block-w'">
          <span>hr初审通过</span>
        </button>
        <button type="button" :class="detailInfo.approvalState > 1 ? 'apply-block-applyBtn' : 'apply-block-w'">
          <span>面试通过</span>
        </button>
        <button type="button" :class="detailInfo.approvalState > 2 ? 'apply-block-applyBtn' : 'apply-block-w'">
          <span>成功聘用</span>
        </button>

      </div>
      <div style="display:flex;justify-content: center;">
        <el-button type="primary" size="small" @click="viewPassed(detailInfo)" style="margin: 10px">审核通过</el-button>
      </div>
      
    </div>
</template>

<script>
import * as getData from '../../service/getData'

export default {
  data() {
    return {
      content1: "电子邮箱：1203333333@qq.com",
      content2: "联系电话：13568687575",
      content3: "1，我什么都会，我很能加班！！！年轻人，要的就是活力",
      content4: "2，我学习能力很强",
      content5: "3，我会好多种编程语言",
      // content6: "",
      detailInfo: {},
      resumeId: parseInt(this.$route.query.resumeId)
    }
  },
  created() {
    this.getHrResume()
  },
  methods: {
    getHrResume(){
      const hrId = this.$route.query.hrId || sessionStorage.getItem('userId')
      const { recruitId,tjId }  = this.$route.query
      const params = { 
        hrId: hrId, 
        recruitId: recruitId,

      }
      let num = 0
      getData.hrResumeList(params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.myList = res.data.data
          for(let i=0; i< this.myList.length; i++) {
            const { resumeId: tempId } = this.myList[i]
            if(tempId === this.resumeId) {
              this.detailInfo = this.myList[i]
              // console.log(this.detailInfo ,"this.detailInfo");
              break
            }
          }
        } else {
            this.$alert("数据加载失败，请刷新", '提示', {
              confirmButtonText: '确定'
            })
          // this.getHrResume();
        }
      })
    },
    openImg(url){
      window.location.href = url;
    },
    viewPassed(row) {
      this.$confirm('确认该被推荐人初审通过,推荐人积分+1，是否继续？', '确认通过', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.pointsInfoAdd(row,1,1,2)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    pointsInfoAdd(row,type,change,num) {
      let data = {
        userId: row.tjId || 110,
        eventType: type,
        changeType:  change,
        pointsNum: num,
        dealer: row.hrId || 110,
        resumeId: parseInt(this.$route.query.resumeId) || 3
      }
      getData.pointsInfoAdd(data).then(res => {
        if (res && res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
        this.$router.go(-1)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.warp-outer {
  font-size: 16px;
  max-width: 800px;
  // min-height: 573px;
  margin: 60px auto;
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
  margin: 20px 0 8px;
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
.apply-block-w {
  color: #333;
  background-color: #fff;
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
