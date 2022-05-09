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
