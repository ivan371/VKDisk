import { normalize, schema } from 'normalizr';

export function foldersNormalize(folders) {
    const user = new schema.Entity('user');
    const folder = new schema.Entity('folder', { author: user });
    folder.define({ folder_set: [folder] });
    return normalize(folders, [folder]);
}

export function folderNormalize(folders) {
    const user = new schema.Entity('user');
    const folder = new schema.Entity('folder', { author: user });
    folder.define({ folder_set: [folder] });
    return normalize(folders, folder);
}

export function folderRecursiveNormalize(folders) {
    const folder = new schema.Entity('folder');
    folder.define({ root: folder });
    return normalize(folders, folder);
}
