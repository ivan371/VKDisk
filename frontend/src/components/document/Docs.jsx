import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeUrls, modalType, format, tileType, urls, items } from '../../constants';
import { docsUnMount, loadDocs, loadDocsMore } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import Tile from '../Tile';
import AddFolder from '../folder/AddFolder';
import BackFolder from '../folder/BackFolder';
import { modalOpen, setModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';

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
        loadDocsMore: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
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

    goBack = (e) => {
        this.props.history.goBack(e);
    };

    onLoadMore = (e) => {
        this.props.loadDocsMore(makeUrls.makeDocsMore(this.props.params.id, this.props.page));
    };
    render() {
        let docList = [];
        let folderList = [];
        let folderHeader = null;
        if (this.props.isTileLoading) {
            folderList = this.props.folderList.map(folderId => (<Tile
                history={ this.props.history }
                url={ `/root/${folderId}` }
                title={ this.props.folders[folderId].title }
                key={ folderId }
                id={ folderId }
                type={ tileType.folder }
            />));
        }
        if (this.props.isLoading) {
            if (this.props.isFolderLoading) {
                if (this.props.params.hasOwnProperty('id')) {
                    folderHeader = (<React.Fragment>
                        <img src={ items.back } className="item-left" onClick={ this.goBack } />
                        <div className="item-name">{this.props.folders[this.props.params.id].title}</div>
                        <AddFolder id={ parseInt(this.props.params.id) } />
                        <button className="vk-button" onClick={ this.onOpen }>Переместить</button>
                    </React.Fragment>);
                }
            }
            docList = this.props.docList.map(docId => (<Tile
                history={ this.props.history }
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
                    {folderHeader}
                </div>
                <div className="content-flex">
                    {folderList}
                    {docList}
                    { this.props.isLoading && this.props.count > (10 * (this.props.page - 1)) ? <div>
                        <button onClick={ this.onLoadMore }>Показать еще</button>
                    </div> : null }
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
    count: state.document.count,
    page: state.document.page,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        loadDocsMore,
        docsUnMount,
        loadFilterFolders,
        modalOpen,
        setModal,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent));
