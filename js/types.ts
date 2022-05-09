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

export enum ErrorCodes {
    ERROR_WRONG_USER,
    ERROR_WRONG_PASSWORD,
    ERROR_SERVER,
}
