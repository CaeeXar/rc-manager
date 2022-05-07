const convert = (datetime?: Date | string): Date => {
    if (!datetime) datetime = new Date();
    else if (!(datetime instanceof Date)) datetime = new Date(datetime);

    return datetime;
}

export const getDatetimeLocal = (datetime?: Date | string): string => {
    datetime = convert(datetime);
    return datetime.toLocaleString('de-AT', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    });
};

export const getDatetimeISO = (datetime?: Date | string): string => {
    // YYYY-MM-DD HH:MM:SS.SSS
    datetime = convert(datetime);
    return datetime.toISOString();
};

export const prepareTextSQLite = (desc: string): string => {
    let newDesc = ``;
    desc.split('').forEach(char => {
        if (char === `'`) newDesc += `''`;
        else newDesc += char;
    });
    return newDesc;
}
