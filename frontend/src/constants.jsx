export const urls = {
    folder: {
        foldersUrl: '/api/v1/folders/',
    },
    docs: {
        docsUrl: '/api/v1/documents/',
    },
};

export const makeUrls = {
    makeFilterDocsFolder: id => `${urls.docs.docsUrl}?folder=${id}`,
    makeFilterFoldersFolder: id => `${urls.folder.foldersUrl}?folder=${id}`,
};
