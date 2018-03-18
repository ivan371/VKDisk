import { normalize, schema } from 'normalizr';

export function docsNormalize(docs) {
    const folder = new schema.Entity('folder');
    const doc = new schema.Entity('doc', { folder });
    return normalize(docs, [doc]);
}

export function docNormalize(docs) {
    const folder = new schema.Entity('folder');
    const doc = new schema.Entity('doc', { folder });
    return normalize(docs, doc);
}
