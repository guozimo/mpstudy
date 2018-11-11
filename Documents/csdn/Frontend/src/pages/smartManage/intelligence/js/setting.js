//positionType的值
export const POINT = 0;
export const ADC = 1;
export const CITY = 2;
export const AREA = 3;

const polymerizationMap = {
    [ADC]: {
        '0-500': 'small',
        '501-1000': 'mid',
        '1001-10000': 'big'
    },
    [CITY]: {
        '0-50': 'small',
        '51-500': 'mid',
        '501-10000': 'big'
    },
    [AREA]: {
        '0-30': 'small',
        '31-100': 'mid',
        '101-10000': 'big'
    }
};


const positionTypeMap = {
    // 13开始可视区的数量大概几百个，用marker可以承受
    [POINT]: [13,14,15,16,17,18],
    [ADC]: [3,4,5,6],
    // 11市级别
    [CITY]: [7,8,9,10,11],
    // 12区级别
    [AREA]: [12]
};

// 根据地图的级别返回对于的 positionType
export function getPositionType (zoom) {
    for (let [key, val] of Object.entries(positionTypeMap)) {
        if (val.includes(zoom)) {
            return +key;
        }
    }
    return 0;
}

export function getPolymerizationStyle (positionType, num) {
    for (let [polymerization,val] of Object.entries(polymerizationMap[positionType])) {
        let [start, end] = polymerization.split('-');
        if (num >= start && num <= end) {
            return val;
        }
    }
}


// 车型样式映射
export const carTypeIconMap = {
    1: 'small',
    2: 'mid',
    3: 'big'
};

// 车状态映射
export const carStatusIconMap = {
    0: 'out',
    1: 'move',
    2: 'stop'
};
