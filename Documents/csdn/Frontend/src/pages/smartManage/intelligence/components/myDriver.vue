<template>
  <div class="my-driver">
    <div class="title">
      <span class="my-title">我的司机</span>
      <span class="clear" @click="clear">清除</span>
    </div>
    <div class="search">
      <i class="icon-search"></i>
      <input type="text" v-model="searchKey" class="search-key" placeholder="请输入司机姓名/司机ID" @input="changeSearch" />
    </div>
    <div class="driver-list">
      <ul>
        <li
          v-for="driver in drivers"
          @click="selectDriver(driver)"
          :class="{selected: driver.driver_id === selectedId}">
          <i class="user"></i>
          <span class="driver-name">{{driver.driver_id}}(ID:{{driver.driver_name}})</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .my-driver{
    font-family: PingFangSC-Regular;
    opacity: 0.8;
    background: #FFFFFF;
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
    border-radius: 0 4px 4px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title{
      height: 28px;
      box-sizing: border-box;
      padding: 6px 10px;
      position: relative;
      border-bottom: 1px solid #999;
      font-size: 12px;
      color: #333333;
      .my-title{
        font-family: PingFangSC-Medium;
      }
      .clear{
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 10px;
        color: #666666;
        cursor: pointer;
      }
    }
    .search{
      margin: 10px;
      width: 170px;
      height: 22px;
      border: 1px solid #999;
      border-radius: 4px;
      display: flex;
      .icon-search{
        background: url('../images/watch-sprite.png') no-repeat -9px -43px;
        width: 10px;
        height: 12px;
        display: inline-block;
        margin: 5px 6px;
        vertical-align: top;
      }
      .search-key{
        border: none;
        width: 140px;
        height: 99%;
        vertical-align: top;
      }
    }
    .driver-list{
      font-size: 10px;
      color: #333333;
      flex: 1;
      overflow: auto;
      li{
        padding: 5px;
        cursor: pointer;
      }
      li.selected{
        background-color: none;
        color: #36ABE7;
        .user{
          background: url('../images/watch-sprite.png')  no-repeat -57px -45px;
        }
        &:after{
          content: '';
          background: url('../images/watch-sprite.png')  no-repeat -78px -45px;
          width: 12px;
          height: 8px;
          display: inline-block;
          float: right;
          margin-right: 10px;
        }
      }
      li:hover{
        background-color: #9DA8CD;
        color: #333333;
        position: relative;
      }
      .user{
        background: url('../images/watch-sprite.png') no-repeat -35px -45px;
        width: 7px;
        height: 8px;
        display: inline-block;
        margin: 0 10px;
      }
    }
  }
</style>
<script>
  import Api from '../js/api';
  export default {
    data () {
      return {
        drivers: [],
        searchKey: '',
        selectedId: 0,
        timer: null
      };
    },
    mounted () {
      this.getMyDrivers();
    },
    methods: {
      async getMyDrivers (key) {
        this.drivers = (await Api.getMyDriver({
          search: key
        })).info;
      },
      changeSearch ($event) {
        let val = $event.target.value;
        if (this.timer && !this.searchKey && this.searchKey !== val) {
          return;
        }
        this.timer = setTimeout(() => {
          let key = this.searchKey;
          this.getMyDrivers(key);
          clearTimeout(this.timer);
        }, 100);
      },
      clear () {
        this.searchKey = '';
        this.getMyDrivers();
      },
      selectDriver (driver) {
        if (driver.driver_id === this.selectedId) {
            this.selectedId = 0;
            return;
        }
        this.selectedId = driver.driver_id;
        this.$emit('change', driver);
      }
    }
  };
</script>
