import { carTypeIconMap, carStatusIconMap,getPolymerizationStyle } from './setting';
//传出当页的markers信息
export let markers = {};
// 创建车辆marker
export function createMakers (map, points, cls, cb) {
    //清除地图上的车辆marker，同时清除marker对象
    clearMakers(map);
    markers = {};
    //再创建新的marker保证内存占用较少
    AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
        for (let point of points) {
            let curCls =  cls;
            let style = `transform: rotate(${+point.dir+180}deg)`;
                curCls += ' ' + carStatusIconMap[point.status];

            let marker = new SimpleMarker({
                iconStyle: `<div class="${curCls}" style="${style}"></div>`,

                //设置基点偏移
                offset: new AMap.Pixel(-8,-18),

                map: map,
                showPositionPoint: false,
                position: [point.longitude,point.latitude]
            });
            //将对应的marker挂载到markers对象上
            markers[point.driver_id] =  marker;

            if (!cb) return;
            AMap.event.addListener(marker, 'click', function() {
                // cb(marker.getPosition());
                cb(marker.getPosition(), point);
            });
        }
    });
}
// 创建仓库marker
export function createWarehouse (map, point, positionType, cb) {
    clearMakers(map);
    AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
        let marker = new SimpleMarker({
            iconLabel: {
                style: {
                    color: '#333',
                    marginTop: '14px',
                    fontSize: '12px'
                }
            },
            iconStyle: `<div class="warehouse-icon"></div>`,
            map: map,
            showPositionPoint: false,
            position: [point.longitude,point.latitude]
        });
        if (!cb) return;
        AMap.event.addListener(marker, 'click', function() {
            cb(marker.getPosition());
        });
    });
}
// 创建聚合marker
export function createPolymerization (map, points, positionType, cb) {
    clearMakers(map);
    let cls = 'together ';
    AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
        for (let point of points) {
            let curCls = cls;
                curCls += getPolymerizationStyle(positionType, point.num);

            let marker = new SimpleMarker({
                iconLabel: {
                    innerHTML: point.num || '',
                    style: {
                        color: '#333',
                        marginTop: '14px',
                        fontSize: '12px'
                    }
                },
                iconStyle: `<div class="${curCls}"></div>`,
                map: map,
                showPositionPoint: false,
                position: [point.longitude,point.latitude]
            });
            if (!cb) return;
            AMap.event.addListener(marker, 'click', function() {
                cb(marker.getPosition());
            });
        }
    });
}
export function createRectangle (map) {

}
// 信息窗体
export function openInfoWindow (map, dom, position, vm) {
    let infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: dom,
        offset: new AMap.Pixel(0, -30)
    });
    dom.querySelector('.close').onclick = function(){
        infoWindow.close();
    }
    dom.querySelector('.playback').onclick = function(){
        vm.$refs.infoWindow.goPlayback();
    }
    infoWindow.open(map, position);
    return infoWindow;
}

export function clearMakers (map) {
    map.clearMap();
}

export function setZoom (map, level) {
    map.setZoom(level);
}
