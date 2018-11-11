<template lang="html">
    <div class="select_wrapper">
      <div class="colorBox" v-show="hide" @click="hide=!hide"></div>
      <div class="time_input" @click.stop="showSelect">
         <input v-model="value" disabled />
      </div>
     <ul class="select" v-show="hide">
      <li v-for="item in selectData" @click="selectItem" :data-type="type">{{item.value}}</li>
     </ul>
    </div>
</template>
<script>
  export default {
    props:{
      selectData:{
        type:Array
      },
      type:{
        type:String
      }
    },
    data(){
      return{
        value: '时段',
        hide:false
      }
    },
    mounted () {

    },
    methods:{
      showSelect:function () {
        this.hide=true;
      },
      selectItem:function (event) {
        this.value=event.target.innerHTML;
        this.hide=false;
        this.$emit('changeMap', [event.target.innerHTML,event.target.dataset.type]);
      }
    }
  }
</script>
<style lang="less" scoped>
  .select_wrapper{
    width: 73px;
    margin-top: 10px;
    .time_input{
      width: 100%;
      height: 29px;
      border: 1px solid #DDDDDD;
      border-radius: 3px;
      position: relative;
      input{
        border: none;
        height: 100%;
        width: 50px;
        display: block;
        margin-left: 5px;
        font-size: 14px;
        color: #999999;
      }
      &::after{
        content:'';
        background: url("../images/record_icon.png") -37px -10px;
        width: 9px;
        height: 5px;
        position: absolute;
        right: 5px;
        top: 12px;
      }
    }
    .select{
      background: #FFFFFF;
      box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
      border-radius: 3px;
      width: 100%;
      position: relative;
      z-index: 10;
      margin-top: 1px;
      li{
        height: 24px;
        line-height: 24px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        &:hover{
          background: #f6f7f9;
        }
      }
    }
    .colorBox{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 0;
    }
  }


</style>
