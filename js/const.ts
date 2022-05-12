import { Build } from './types';

export const RequiredFieldsBuild: Array<keyof Build> = [
    'title',
    'escName',
    'fcName',
    'motorName',
    'frameName',
    'vtxName',
    'antennaName',
    'cameraName',
    'receiverName',
    'propellerName',
];

export const RestrictedPages: string[] = ['/batteries', '/builds', '/places'];
