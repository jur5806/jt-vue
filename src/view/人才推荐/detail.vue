<template>
    <div class="warp-outer">
      <i class="el-icon-back" style="margin-right: 15px" @click="$router.go(-1)">
          <span style="margin-right: 15px;color: #333;cursor: pointer;">返回</span>
      </i>
      <svg-icon icon-class="back" class-name="card-panel-icon" />
      <div class="job-header">
        {{detailInfo.stationTitle || '直播运营技术实习生-大力教育'}}
      </div>
      <div class="job-info">
        <span>
          {{ detailInfo.workPlace ||'北京'}}
        </span>
        <div class="line-devider"></div>
        <span>
          {{ detailInfo.stationName || '运营'}}
        </span>
        <!-- <div class="line-devider"></div>
        <span>
          日常实习生
        </span> -->
        <div class="line-devider"></div>
        <span v-if="detailInfo.rcDepartmentNum">
          在招人数：{{ detailInfo.rcDepartmentNum}}
        </span>
        <div class="line-devider"></div>
        <span v-if="detailInfo.eductionClass">
          学历要求：{{ detailInfo.eductionClass | eductionClass}}
        </span>
      </div>
      <div class="block-title">
        职位描述
      </div>
      <!-- <div class="block-content">{{detailInfo.rcDescribe}}</div>
      <div class="block-content">{{content2}}</div> -->
      <div v-for="(item, index) in content1" :key="index">
        <div class="block-content">{{item}}</div>
      </div>
      <div class="block-title">
        薪资福利
      </div>
      <div class="block-content">{{detailInfo.rcSalaryWelfare}}</div>
      <div class="apply-block">
        <button type="button" class="apply-block-applyBtn" @click="goUp()">
          <span>投递</span>
        </button>
      </div>
    </div>
</template>

<script>
import {recruitList,LookById} from '../../service/getData.js'
export default {
  data() {
    return {
      content1: "1.日常对接主播及产品运营，维护直播间日常直播秩序，能够学习和了解直播技术sop，快速解决直播中出现的应急问题",
      content2: "2.对数据敏感，每场直播后可以独立复盘正常直播数据走向，并提出相关解决方案",
      content3: "1，对教育行业或直播电商或短视等领域感兴趣",
      content4: "2，学习能力强，对直播运营有一定了解，关注过淘宝直播或抖音直播",
      content5: "3，有一定的影视专业基础，对于灯光，摄影，演播室，后期制作，整体工作流程有了解。",
      // content6: "",
      item: [],
      detailInfo: {},
      recruitId: parseInt(this.$route.params.recruitId),
      position: '',
      eductionClass:'',
      PostionInfo: '',
      content: []
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    
    formatPosition(data) {
    if(data === 1){
      return "前端"
    } else if(data === 2){
      return "产品"
    } else if(data ===3){
      return "运营"
    } else if(data === 4) {
      return "其他"
    }
   },
    formatEducation(data) {
      if(data === 1){
        return "大专"
      } else if(data === 2){
        return "本科"
      } else if(data ===3){
        return "硕士"
      } else if(data === 4) {
        return "博士"
      } else {
        return "不限"
      }
    },
    getDetail() {
      // const recruitId = this.$route.params.recruitId
      console.log(this.$route.params,"recruitId");
      recruitList({name:'', id: 0}).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.list = res.data.data
          for(let i=0; i< this.list.length; i++) {
            const { recruitId: tempId } = this.list[i]
            if(tempId === this.recruitId) {
              this.detailInfo = this.list[i]
              this.content1 = this.detailInfo.rcDescribe.split("\n");
              // console.log(this.detailInfo ,"this.detailInfo");
              break
            }
          }
          this.position = this.formatPosition(this.detailInfo.positionTypeId)
          this.eductionClass = this.formatEducation(this.detailInfo.eductionClass)
        } else {
          this.getRecruitList();
        }
      })
    },
    goUp() {
      this.$router.push({ path: '/ResumeUpload', query: { recruitId: this.detailInfo.recruitId, hrId: this.detailInfo.hrId }})
    }
  },
  filters: {
    eductionClass(val){ //学历筛选
      switch (val) {
        case 1:
          return '初中以上';
        case 2:
          return '高中及中专以上';
        case 3:
          return '大专及以上';
        case 4:
          return '本科及以上';
        case 5:
          return '研究生及以上';
        case 6:
          return '不做要求';
        default:
          return '-'
      }
    },
    date(val) {//date 横杆年月日格式
      switch (val) {
        case null:
        case undefined:
        case '':
          return '-';
        default:
          return new Date(val).format('yyyy-MM-dd')
      }
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
}
</style>
