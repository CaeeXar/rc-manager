export type User = {
    username: string;
    password: string;
};

export type Build = {
    id: number | null;
    username: string;
    title: string;
    description: string | null;
    escName: string;
    escLink: string | null;
    fcName: string;
    fcLink: string | null;
    motorName: string;
    motorLink: string | null;
    frameName: string;
    frameLink: string | null;
    vtxName: string;
    vtxLink: string | null;
    antennaName: string;
    antennaLink: string | null;
    cameraName: string;
    cameraLink: string | null;
    receiverName: string;
    receiverLink: string | null;
    propellerName: string;
    propellerLink: string | null;
    modified: string | null;
};

export enum BatteryType {
    LIPO = 'LI_PO_NORMAL',
    LPHV = 'LI_PO_HV',
    LION = 'LI_ION',
}

export enum ErrorCodes {
    ERROR_WRONG_USER,
    ERROR_WRONG_PASSWORD,
    ERROR_SERVER,
}

export type Battery = {
    id: number | null;
    username: string;
    brand: string;
    description: string | null;
    capacity: number;
    cells: number;
    link: string | null;
    batteryType: BatteryType;
    created: string | null;
    modified: string | null;
};
