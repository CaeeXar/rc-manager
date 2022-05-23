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

export type Place = {
    id: number | null;
    username: string;
    title: string;
    description: string | null;
    googleMapsLink: string;
    imgPath: string | null;
    modified: string | null;
};

export enum RateType {
    'BETAFLIGHT' = 'BETAFLIGHT',
    'RACEFLIGHT' = 'RACEFLIGHT',
    'KISS' = 'KISS',
    'QUICKRATES' = 'QUICKRATES',
    'ACTUAL' = 'ACTUAL',
}

// baserate
export type BaseRate = {
    id: number | null;
    username: string;
    title: string;
    description: string | null;
    modified: string | null;
    rateType: RateType;

    // roll
    rollRcRate?: number;
    rollRate?: number;
    rollExpo?: number;
    rollAcroPlus?: number;
    rollCurve?: number;
    rollCenterSens?: number;
    rollMaxRate?: number;

    // pitch
    pitchRcRate?: number;
    pitchRate?: number;
    pitchExpo?: number;
    pitchAcroPlus?: number;
    pitchCurve?: number;
    pitchCenterSens?: number;
    pitchMaxRate?: number;

    // yaw
    yawRcRate?: number;
    yawRate?: number;
    yawExpo?: number;
    yawAcroPlus?: number;
    yawCurve?: number;
    yawCenterSens?: number;
    yawMaxRate?: number;
};

// specific rates
export type RateBetaflight = {
    rateType: RateType.BETAFLIGHT;
    rollRcRate: number;
    rollRate: number;
    rollExpo: number;
    pitchRcRate: number;
    pitchRate: number;
    pitchExpo: number;
    yawRcRate: number;
    yawRate: number;
    yawExpo: number;
};
export type RateKISS = {
    rateType: RateType.KISS;
    rollRcRate: number;
    rollRate: number;
    rollCurve: number;
    pitchRcRate: number;
    pitchRate: number;
    pitchCurve: number;
    yawRcRate: number;
    yawRate: number;
    yawCurve: number;
};
export type RateActual = {
    rateType: RateType.ACTUAL;
    rollCenterSens: number;
    rollMaxRate: number;
    rollExpo: number;
    pitchCenterSens: number;
    pitchMaxRate: number;
    pitchExpo: number;
    yawCenterSens: number;
    yawMaxRate: number;
    yawExpo: number;
};
export type RateRaceflight = {
    rateType: RateType.RACEFLIGHT;
    rollRate: number;
    rollAcroPlus: number;
    rollExpo: number;
    pitchRate: number;
    pitchAcroPlus: number;
    pitchExpo: number;
    yawRate: number;
    yawAcroPlus: number;
    yawExpo: number;
};
export type RateQickrates = {
    rateType: RateType.QUICKRATES;
    rollRcRate: number;
    rollMaxRate: number;
    rollExpo: number;
    pitchRcRate: number;
    pitchMaxRate: number;
    pitchExpo: number;
    yawRcRate: number;
    yawMaxRate: number;
    yawExpo: number;
};

// typed Rate where specified props cannot be null 🖕
export type Rate = BaseRate &
    (RateBetaflight | RateKISS | RateActual | RateQickrates | RateRaceflight);

// keys of typed Rate-fields for const
export type DynamicKeys = Exclude<
    | keyof RateBetaflight
    | keyof RateKISS
    | keyof RateActual
    | keyof RateQickrates
    | keyof RateRaceflight,
    'rateType'
>;
