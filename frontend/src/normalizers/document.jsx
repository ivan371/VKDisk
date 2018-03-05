import { normalize, schema } from 'normalizr';

export function docsNormalize(docs) {
    const doc = new schema.Entity('doc');
    return normalize(docs, [doc]);
}
