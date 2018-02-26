import { normalize, schema } from 'normalizr';

export function foldersNormalize(folders) {
    const user = new schema.Entity('user');
    const folder = new schema.Entity('folder', { author: user });
    return normalize(folders, [folder]);
}