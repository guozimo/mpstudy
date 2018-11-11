<template>
    <div class="suggest-compent">
        <div class="input-box" :style="styles" @click="show">
            <template v-if="type===types[0]">
                <input
                  v-model="searchKey"
                  @click="remoteRequest" :placeholder="placeholder" class="input" ref="input" @input="remoteRequest"/>
                <i class="arrow-icon"></i>
                <!-- <i class="close-icon" @click="clear" v-if="showClose"></i> -->
            </template>
            <template v-if="type===types[1]">
                <span class="input" ref="input">{{placeholder}}</span>
                <i class="arrow-icon"></i>
                <!-- <i class="close-icon" @click="clear" v-if="showClose"></i> -->
            </template>
            <template v-if="type===types[2]">
                <input :placeholder="placeholder" class="input" ref="input" v-model="inputKey" @keyup.enter="search" @input="searchgInput"/>
                <i class="search-icon" @click="search"></i>
                <!-- <i class="close-icon" @click="clear" v-if="showClose"></i> -->
            </template>
        </div>
        <ul class="options" ref="ul" v-show="visible" @click.stop="select">
            <li class="option" :title="o.text" v-for="o in options" :value="o.value">{{o.text}}</li>
        </ul>
    </div>
</template>
<style lang="less">
    .suggest-compent{
        position: relative;
        .input-box{
            opacity: 0.8;
            background: #FFFFFF;
            box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
            position: relative;
            padding-left: 10px;
            padding-right: 10px;
            &:hover .close-icon {
                background: url('../images/watch-sprite.png') no-repeat -104px -45px;
                width: 8px;
                height: 8px;
                vertical-align: middle;
                margin-right: 6px;
                position: absolute;
                right: 20px;
                top: 11px;
            }
        }
        .input{
            width: 100%;
            padding-right: 10px;
            border: none;
            height: 31px;
            line-height: 31px;
            display: inline-block;
            vertical-align: middle;
            &:hover{

            }
        }
        .arrow-icon{
            background: url('../images/watch-sprite.png') no-repeat -10px -13px;
            width: 9px;
            height: 5px;
            vertical-align: middle;
            margin-right: 6px;
            position: absolute;
            right: 5px;
            top: 13px;
        }
        .search-icon{
            background: url('../images/watch-sprite.png') no-repeat -29px -8px;
            width: 13px;
            height: 16px;
            display: inline-block;
            position: absolute;
            top: 8px;
            right: 5px;
        }
        .options{
            position: absolute;
            width: 100%;
            border-radius: 4px;
            margin-top: 1px;
            opacity: 0.8;
            background: #FFFFFF;
            box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
            // padding-top: 5px;
            overflow: auto;
            max-height: 200px;
            z-index: 1;
        }
        .option{
            text-align: center;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover{
                color: #36ABE7;
                cursor: pointer;
            }
        }
    }
</style>
<script>
    export default {
        props: {
            type: {
                type: String
            },
            styles: {
                type: Object
            },
            placeholder: {
                type: String
            },
            options: {
                type: Array,
                default () {
                  return [];
                }
            },
            showClose: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                visible: false,
                timer: null,
                searchKey: '',
                inputKey: '',
                defaultValue: this.placeholder,
                types: ['suggest', 'select', 'search']
            };
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                if (!this.placeholder) {
                    this.$refs.input.innerHTML = this.options[0].text;
                    this.$emit('input', this.options[0].value);
                }
                // 临时方案
                document.addEventListener('click', (e) => {
                    if (e.target === (this.$refs && this.$refs.input) || e.target.parentNode === this.$refs.ul) {
                        return;
                    }
                    this.visible = false;
                }, false);
            },
            show () {
                if (this.options.length) {
                  this.visible = true;
                }
            },
            search ($event) {
                this.$emit('search', this.inputKey);
            },
            searchgInput () {
                this.$emit('input', this.inputKey);
            },
            select ($event) {
                let val = $event.target.getAttribute('value');
                this.$refs.input.innerHTML = $event.target.innerHTML;
                this.$refs.input.value = $event.target.innerHTML;
                this.searchKey = $event.target.innerHTML;
                this.$emit('input', val);
                this.$emit('change', val);
                this.visible = false;
            },
            clear () {
                if (this.type === this.types[1]) {
                    this.$refs.input.innerHTML = this.defaultValue;
                }
                this.set('', this.$refs.input.innerHTML);
                this.$emit('clear', '');
            },
            setEmpty () {
                if (this.type === this.types[1]) {
                    this.$refs.input.innerHTML = this.defaultValue;
                }
                this.set('',this.$refs.input.innerHTML);
            },
            set (value, text) {
                this.searchKey = this.inputKey = text;
                this.$refs.input.value = text;
                this.$refs.input.innerHTML = text;
                this.$emit('input', value);
                this.visible = false;
            },
            remoteRequest ($event) {
                let val = $event.target.value;
                this.$emit('input', val);
                if (this.timer && !this.searchKey && this.searchKey !== val) {
                    return;
                }
                this.timer = setTimeout(() => {
                    let key = this.searchKey;
                    this.visible = true;
                    this.$emit('remoteRequest', key);
                    clearTimeout(this.timer);
                }, 100);
            }
        }
    };
</script>
