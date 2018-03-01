export const urls = {
    folder: {
        foldersUrl: '/api/v1/folders/?root&&',
        chatFolderUrl: './api/v1/folders/?chats&&',
    },
    docs: {
        docsUrl: '/api/v1/documents/',
    },
};

export const makeUrls = {
    makeFilterDocsFolder: id => `${urls.docs.docsUrl}?folder=${id}`,
    makeFilterFoldersFolder: id => `${urls.folder.foldersUrl}folder=${id}`,
};

export const folderType = {
    root: 'root',
    chat: 'chat',
};
