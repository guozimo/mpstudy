//创建路径以及巡航器
export function createPath (map, pointsArr) {

    return new Promise((reslove, reject) => {

        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }
            //首先清除上个轨迹
            if (window.pathSimplifierIns) {
                window.pathSimplifierIns.setData([]);
            };

            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                //autoSetFitView:false,
                map: map, //所属的地图实例

                getPath: function(pathData, pathIndex) {

                    return pathData.path;
                },
                getHoverTitle: function(pathData, pathIndex, pointIndex) {

                    if (pointIndex >= 0) {
                        //point
                        return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                    }

                    return pathData.name + '，点数量' + pathData.path.length;
                },
                renderOptions: {
                    // 轨迹线的样式
                    pathLineStyle: {
                        strokeStyle: '#359D66',
                        lineWidth: 6,
                        dirArrowStyle: true
                    },
                    pathLineHoverStyle: null,
                    pathLineSelectedStyle: {
                        strokeStyle: '#359D66',
                        lineWidth: 6,
                        dirArrowStyle: true
                    }
                }
            });

            window.pathSimplifierIns = pathSimplifierIns;

            //设置数据
            pathSimplifierIns.setData([{
                name: '路线',
                path: pointsArr
            }]);

            //对第一条线路（即索引 0）创建一个巡航器
            let navg = pathSimplifierIns.createPathNavigator(0, {
                loop: true,
                speed: 2000, //巡航速度，单位千米/小时
                pathNavigatorStyle: {
                                width: 18,
                                height: 18,
                                //使用图片
                                content: PathSimplifier.Render.Canvas.getImageContent('/static/img/pathCar.png', onload, onerror),
                                strokeStyle: null,
                                fillStyle: null,
                                pathLinePassedStyle: null
                            }
            });

            reslove(navg);
        });
    })
}
//创建停留点
export function createStopMarkers (map, points) {
    //清除地图上的车辆marker，同时清除marker对象
    map.clearMap();
    //再创建新的marker保证内存占用较少
    for (let point of points) {
        new AMap.Marker({
            icon: new AMap.Icon({
                size: new AMap.Size(12, 12),  //图标大小
                image: "/static/img/stopPoint.png"
            }),
            //设置基点偏移
            map: map,
            position: [point[0],point[1]],
            label: {
                offset: new AMap.Pixel(12, 8),
                content: point[2]
            }
        });
    }
}
//创建起始点
export function createMarker (map, option = {}) {
    //拼接icon的url
    const ICONPATH = "/static/img/" + option.path;
    new AMap.Marker({
        icon: new AMap.Icon({
            size: new AMap.Size(25, 30.6),  //图标大小
            image: ICONPATH
        }),
        offset: new AMap.Pixel(-13, -32),
        map: map,
        position: option.location
    });
}
