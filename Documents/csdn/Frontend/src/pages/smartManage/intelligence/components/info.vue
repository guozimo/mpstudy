<template>
  <div>
    <tip-info ref="info">
      <div slot="body">
        <div>行驶中：速度>0</div>
        <div>静止中：速度=0</div>
        <div>离线中：持续10分钟无法采集GPS数据</div>
        <div>云鸟出车中：出车状态为签到，签到时间在72小时以内且未点击配送完成且签到时间后无其他配送完成记录的车辆</div>
      </div>
    </tip-info>
  </div>
</template>
<script>
  import tipInfo from './tipInfo';
  export default {
    components: {
      tipInfo
    },
    methods: {
      show () {
        this.$refs.info.show();
      }
    }
  };
</script>
