import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeUrls, urls } from '../../constants';
import { docsUnMount, loadDocs } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import Tile from '../Tile';
import AddFolder from '../folder/AddFolder';

class DocsComponent extends React.Component {
    static propTypes = {
        loadDocs: PropTypes.func.isRequired,
        loadFilterFolders: PropTypes.func.isRequired,
        docsUnMount: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        docList: PropTypes.array.isRequired,
        folderList: PropTypes.array.isRequired,
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
    render() {
        let docList = [];
        let folderList = [];
        if (this.props.isTileLoading) {
            folderList = this.props.folderList.map(folderId => (<Tile
                url={ `/root/${folderId}` }
                title={ this.props.folders[folderId].title }
                key={ folderId }
                imgUrl="/static/img/folder.png"
            />));
            if (this.props.params.hasOwnProperty('id')) {
                folderList.unshift(<AddFolder key={ 0 } imgUrl="/static/img/folder_add.png" id={ parseInt(this.props.params.id) } />);
                folderList.unshift(<Tile
                    key={ -1 }
                    title=""
                    imgUrl="/static/img/folder_back.png"
                    url={ `/root/${this.props.params.id}` }
                />);
            }
        }
        if (this.props.isLoading) {
            docList = this.props.docList.map(docId => <Tile url={ `/file/${docId}` } title={ this.props.docs[docId].title } key={ docId } imgUrl="/static/img/file.png" />);
        }
        return (
            <div className="page-content-content-content content-flex">
                {folderList}
                {docList}
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.document.isLoading,
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
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent);
