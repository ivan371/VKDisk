import { normalize, schema } from 'normalizr';

export function foldersNormalize(folders) {
    const folder = new schema.Entity('folder');
    return normalize(folder, [folders]);
}
