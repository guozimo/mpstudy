<template>
    <div>
        <tip-info ref="info" :title="car.driver_name+'(ID:'+car.driver_id+')'">
            <div slot="body">
                <div class="body-item">
                    <span>车型：</span>
                    <span>{{car.car_type_name}}</span>
                </div>
                <div class="body-item">
                    <span>行驶位置：</span>
                    <span>{{car.location}}</span>
                </div>
                <div class="body-item">
                    <span>时速：</span>
                    <span>{{car.speed}}</span>
                </div>
                <div class="body-item">
                    <span>定位时间：</span>
                    <span>{{car.position_time}}</span>
                </div>
                <div class="body-item-operation">
                    <span class="playback">回放</span>
                    <!-- <i></i> -->
                    <!-- <span class="follow">跟踪</span> -->
                </div>
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
        props: {
            car: {
                type: Object
            }
        },
        methods: {
            show () {
                this.$refs.info.show();
            },
            close () {
                this.$emit('close');
            },
            goPlayback () {
                this.$router.push({
                    name: 'Playback',
                    query: {
                        driver_id: this.car.driver_id
                    }
                })
            }
        }
    };
</script>
