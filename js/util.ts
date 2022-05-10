import { BatteryType } from './types';

const convert = (datetime?: Date | string | null): Date => {
    if (!datetime) datetime = new Date();
    else if (!(datetime instanceof Date)) datetime = new Date(datetime);

    return datetime;
};

export const getDatetimeLocal = (datetime?: Date | string | null): string => {
    datetime = convert(datetime);
    return datetime.toLocaleString('de-AT', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    });
};

export const getDatetimeISO = (datetime?: Date | string | null): string => {
    // YYYY-MM-DD HH:MM:SS.SSS
    datetime = convert(datetime);
    return datetime.toISOString();
};

export const prepareTextSQLite = (text: string): string => {
    let newDesc = ``;
    text.split('').forEach((char) => {
        if (char === `'`) newDesc += `''`;
        else newDesc += char;
    });
    return newDesc;
};

export const prepareTextSearch = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().replace(/[\/\\#,+()$~%.:*?<>{}-]/gm, '');
};

export const getBatteryTypeText = (batteryType: BatteryType): string => {
    if (batteryType === BatteryType.LION) return 'Lithium-Ion';
    else if (batteryType === BatteryType.LIPO) return 'Lithium-Polymer';
    else return 'Lithium-Polymer High Voltage';
};

export const getDateDiff = (date: Date, type?: number): number => {
    const diffInMilli = new Date().getTime() - date.getTime();
    return diffInMilli / (1000 * 3600 * 24 * (type || 1));
};
