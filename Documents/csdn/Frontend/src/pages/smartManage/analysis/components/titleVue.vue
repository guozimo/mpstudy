<template lang="html">
    <div class="title record_title">
      <span>
        <i></i>{{title}}
      </span>
      <selectVue v-if="selectData" :type="type" :selectData="selectData" @changeMap="changeMap"  />
    </div>
</template>
<script>
  import selectVue from './select';
  export default {
    props:{
      title:{
        type: String
      },
      selectData:{
        type:Array
      },
      type:{
        type:String
      }
    },
    components:{
      selectVue
    },
    methods:{
      changeMap(e){
        //console.log(e)
        this.$emit('changeMap', e);
      }
    }
  }
</script>
<style lang="less" scoped>
    .title{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #E6EAEE;
      font-size: 14px;
      color: #666666;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      position: relative;
      i{
        background: url("../images/record_icon.png") -8px -5px;
        width: 10px;
        height: 12px;
        display: inline-block;
        margin-right: 10px;
      }
    }

</style>
