export type User = {
    username: string;
    password: string;
};

export type Build = {
    id: number;
    username: string;
    title: string;
    description: string | null;
    escName: string;
    escLink: string;
    fcName: string;
    fcLink: string;
    motorName: string;
    motorLink: string;
    frameName: string;
    frameLink: string;
    vtxName: string;
    vtxLink: string;
    antennaName: string;
    antennaLink: string;
    cameraName: string;
    cameraLink: string;
    receiverName: string;
    receiverLink: string;
    propellerName: string;
    propellerLink: string;
    modified: string;
};

export enum ErrorCodes {
    ERROR_WRONG_USER,
    ERROR_WRONG_PASSWORD,
    ERROR_SERVER,
}

export type DroneSpecification = {
    title: string;
    name: string;
    link: string;
};
