import echarts from "echarts";

export default {
  mixChart: function (optionName) {
    let legendObj = [];
    optionName.legendData.map(function (item) {
      let obj = {name: item, icon: "roundRect"}
      legendObj.push(obj)
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: "#fff",
        extraCssText: 'box-shadow: 0 0 5px 2px rgba(0,0,0,0.12);border-radius: 3px',
        borderColor: "#ddd",
        borderWidth: 1,
        textStyle: {
          color: "#333",
          fontSize: 12
        }
      },
      legend: {
        data: legendObj,
        textStyle: {
          fontSize: 12,
          color: '#666'
        },
        itemWidth: 18,
        itemHeight: 18
      },
      xAxis: {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#666"
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: ' #ECF1F7'
          }
        },
        data: optionName.xAxis.data
      },
      yAxis: [{
        type: "value",
        name: optionName.yAxis.left.name,
        max: optionName.yAxis.left.max,
        min: optionName.yAxis.left.min,
        splitNumber:7,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#666',
            width: '1'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#666',

          },
          rotate: 60,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: ' #ECF1F7'
          }

        }
      }, {
        type: "value",
        name: optionName.yAxis.right.name,
        max: optionName.yAxis.right.max,
        min: optionName.yAxis.right.min,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#666',
            width: '1'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#666',

          },
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: ' #ECF1F7'
          }

        }
      }
      ],
      grid: {
        top: 70,
        bottom: 50,
      },
      series: optionName.seriesData
    };
    optionName.legendData = null;
    return option
  },
  customChart:function (optionName) {
    let option={
      tooltip: {
        formatter: function (params) {
          return params.data.name;
        },
        backgroundColor: "#fff",
        extraCssText: 'box-shadow: 0 0 5px 2px rgba(0,0,0,0.12);border-radius: 3px',
        borderColor: "#ddd",
        borderWidth: 1,
        textStyle: {
          color: "#333",
          fontSize: 12
        }
      },
      grid: {
        height:300
      },

      xAxis: {
        min: 0,
        scale: true,
        max:24,
        splitNumber:12,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#666',
            width: '1'
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: ' #ECF1F7'
          }

        }
      },
      yAxis: {
        data: optionName.categories,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#666"
          }
        },
        axisLabel: {
          textStyle: {
            color: '#666',

          },
          rotate: 30,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: ' #ECF1F7'
          }
        },
      },
      visualMap: {
        type: 'piecewise',
        categories: ["0km/h","<40km/h",">=40km/h",">=60km/h",">=90km/h"],
        inRange: {
          color: ['#EEEEEE', '#20D0B5', '#FBBD33','#B0A3FD','#FA8C8D'],
          symbolSize: [30, 100]
        },
        top: 'middle',
        left:"right",
        selectedMode:'false',
        dimension: 4,
        seriesIndex:0,
      },
      series: [{
        type: 'custom',
        renderItem: this.getItem,
        itemStyle: {
          normal: {
            opacity: 0.8
          }
        },
        encode: {
          x: [1, 2],
          y: 0
        },
        data: optionName.data
      }],
      grid: {
        top: 70,
        bottom: 50
      }
    }
    return option
  },
  getItem:function (params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = 20;
    return {
      type: 'rect',
      shape: echarts.graphic.clipRectByRect({
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
      }, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      }),
      style: api.style()
    };
  }
}






