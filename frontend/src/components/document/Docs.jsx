import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {makeUrls, modalType, format, tileType, urls} from '../../constants';
import { docsUnMount, loadDocs } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import Tile from '../Tile';
import AddFolder from '../folder/AddFolder';
import BackFolder from '../folder/BackFolder';
import {modalOpen, setModal} from '../../actions/modal';

class DocsComponent extends React.Component {
    static propTypes = {
        loadDocs: PropTypes.func.isRequired,
        loadFilterFolders: PropTypes.func.isRequired,
        docsUnMount: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        docList: PropTypes.array.isRequired,
        folderList: PropTypes.array.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id));
            this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(this.props.params.id));
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(nextProps.params.id));
                this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(nextProps.params.id));
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.params.hasOwnProperty('id') && prevProps.params.hasOwnProperty('id')) {
            this.props.docsUnMount();
        }
    }

    componentWillUnmount() {
        this.props.docsUnMount();
    }

    onOpen = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };
    render() {
        let docList = [];
        let folderList = [];
        let folderName = null;
        if (this.props.isTileLoading) {
            folderList = this.props.folderList.map(folderId => (<Tile
                url={ `/root/${folderId}` }
                title={ this.props.folders[folderId].title }
                key={ folderId }
                id={ folderId }
                type={ tileType.folder }
            />));
            if (this.props.params.hasOwnProperty('id')) {
                folderList.unshift(<AddFolder
                    key={ 0 }
                    imgUrl={ format.folderAdd }
                    id={ parseInt(this.props.params.id) }
                />);
                folderList.unshift(<BackFolder
                    key={ -1 }
                    imgUrl={ format.folderBack }
                />);
            }
        }
        if (this.props.isLoading) {
            if (this.props.isFolderLoading) {
                if (this.props.params.hasOwnProperty('id')) {
                    folderName = this.props.folders[this.props.params.id].title;
                }
            }
            docList = this.props.docList.map(docId => (<Tile
                id={ docId }
                url={ `/file/${docId}` }
                title={ this.props.docs[docId].title }
                key={ docId }
                type={ tileType.file }
            />));
        }
        return (
            <div className="page-content-content-content">
                <div className="content-item">
                    <span>
                        {folderName}
                    </span>
                    <button className="vk-button" onClick={ this.onOpen }>Переместить</button>
                </div>
                <div className="content-flex">
                    {folderList}
                    {docList}
                </div>
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.document.isLoading,
    isFolderLoading: state.folder.isLoading,
    docList: state.document.docList,
    docs: state.document.docs,
    folderList: state.folder.folderTileList,
    folders: state.folder.folders,
    isTileLoading: state.folder.folderTileList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        docsUnMount,
        loadFilterFolders,
        modalOpen,
        setModal,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent);
