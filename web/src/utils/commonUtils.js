export const toPercent = (num) => {
    return parseFloat(num).toFixed(2);
}

export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const formatNumber = (number, precision) => {
    const num = isNaN(number) || number === null ? 0.00 : number;
    return num.toFixed(precision);
}

export const amountFormatStyle = width => {
    return {width: `${width}px`, textAlign: 'right'};
}

export const TM_JOB_ROLE = 'jobrl00000000000000000000000000000001';
export const RM_JOB_ROLE = 'jobrl00000000000000000000000000000002';
export const ZSM_JOB_ROLE = 'jobrl00000000000000000000000000000003';
export const MIS_JOB_ROLE = 'jobrl10000000000000000000000000000001';
