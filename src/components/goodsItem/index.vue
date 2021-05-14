<!-- 单个积分兑换物品显示组件 -->
<template>
  <div class="item-info-wrapper">
    <div
      class="item-image"
      :class="{'cover':item.defaultImg}"
      :style="{backgroundImage: 'url(' + (item.imgPath?item.imgPath:defaultImg)+ ')'}"
    >
      <div v-if="type!=='goods'" v-show="item.defaultImg" class="item-value" :class="type">
        <span class="value">{{couponType}}</span>
        <span v-if="item.couponType" class="unit">{{couponType}}</span>
        <span v-else class="unit">元</span>
      </div>
    </div>
    <div class="item-detail">
      <p class="name">{{item.title}}</p>
      <div class="number-info">
        <div>
          <span class="price">{{item.integral}}</span>
          <span class="integral-font">积分</span>
        </div>
        <span class="count" v-if="item.count > -1">{{item.count}}人已兑换</span>
      </div>
      <div class="disable-logo"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      // defaultImg: 'https://assets.2dfire.com/frontend/782ce93f5fa2953b74968c18a3e899f2.png'
      defaultImg: 'https://assets.2dfire.com/frontend/74745e98fcf760bc0a1c469d7b4dfb02.png'

    }
  },
  computed: {
    // itemUnit() {
    //   const self = this
    //   const type = self.item.couponType
    //   let unit = ''
    //   if (type === 1) {
    //     unit = '元'
    //   } else if (type === 2) {
    //     unit = '折'
    //   }
    //   return unit
    // },
    // itemValue() {
    //   const self = this
    //   const itemValue = self.item.value
    //   const tempType = self.item.couponType
    //   let value = 0
    //   if (self.type === 'coupon' && tempType === 2) {
    //     value = itemValue / 10
    //   } else {
    //     value = itemValue / 100
    //   }
    //   return value
    // },
    exchangeStatus() {
      const { status = 0 } = this.item
      return status > 0
    }
  },
  methods: {
    // goItemDetail() {
    //   // let path = ''
    //   let name = ''
    //   const { id = '', title = '' } = this.item
    //   const nowType = this.type || ''
    //   const mallId = this.integralMallEntityId || ''
    //   if (nowType === 'goods') {
    //     name = 'material'
    //     // path = `/material?integral_mall_entity_id=${mallId}&id=${id}&title=${title}`
    //   } else if (nowType === 'card') {
    //     name = 'cardBalance'
    //     // path = `/cardBalance?integral_mall_entity_id=${mallId}&id=${id}&title=${title}`
    //   } else {
    //     name = 'coupon'
    //     // path = `/coupon?integral_mall_entity_id=${mallId}&id=${id}&title=${title}`
    //   }
    //   console.log(name, mallId, id, title)
    //   this.$router.push({
    //     name,
    //     query: {
    //       integral_mall_entity_id: mallId,
    //       id,
    //       title
    //     }
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.m-16 {
  margin-left: 32px;
}
.item-info-wrapper {
  width: 100%;
  display: inline-block;
  .item-image {
    width: 100%;
    height: 264px;
    // background-color: #d4d4d4;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 16px 16px 0 0;
    position: relative;
    background-image: url('https://assets.2dfire.com/frontend/bb921eed8046aaed0b7f2b27c4fa4ce7.png');
    &.cover {
      background-size: cover;
    }
  }
  .item-value {
    color: #ffffff;
    padding: 140px 0px 0px 70px;
    .icon-logo {
      width: 54px;
      height: 54px;
      display: inline-block;
      margin-right: 10px;
    }
    .value {
      font-size: 52px;
      font-family: PingFangSC-Medium,PingFang SC;
      font-weight: 500;
      line-height: 52px;
    }
    .unit {
      font-size:20px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
  .item-detail {
    width: 100%;
    padding: 24px 16px 24px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 0 0 16px 16px;
    height: 144px;
    position: relative;
    &.exchange-disable {
      position: relative;
      .disable-logo {
        position: absolute;
        width: 90px;
        height: 90px;
        top: 16px;
        right: 20px;
        background: url(https://assets.2dfire.com/frontend/3ed71a9dfeeb513e9e6a6fb0ade43eee.png) no-repeat;
        background-size: cover;
      }
    }
    .name {
      font-size: 28px;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 36px;
      font-weight: 400;
    }
    .number-info {
      margin-top: 16px;
      display: flex;
      vertical-align: center;
      align-items: center;
      .price {
        font-size: 32px;
        text-align: left;
        flex: 1;
        font-family: PingFangSC-Medium,PingFang SC;
        font-weight: 500;
        color:rgba(236,49,61,1);
      }
      .integral-font {
        font-size: 24px;
        font-family: PingFangSC-Medium,PingFang SC;
        font-weight: 500;
        color: rgba(236,49,61,1);
      }
      .count {
        color: #666666;
        letter-spacing: 0;
        text-align: right;
        position: absolute;
        right: 16px;
      }
    }
  }
}
</style>
