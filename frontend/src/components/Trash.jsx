import React from 'react';
import PropTypes from 'prop-types';
import {dragSource, items, makeUrls, modalType} from '../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteDocs} from '../actions/document';
import {dropOver} from '../actions/drag';
import {deleteFolders} from '../actions/folder';
import {modalOpen, setModal} from '../actions/modal';

class TrashComponent extends React.Component {

    static propTypes = {
        deleteDocs: PropTypes.func.isRequired,
        dropOver: PropTypes.func.isRequired,
        deleteFolders: PropTypes.func.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        allowDrag: PropTypes.bool.isRequired,
        source: PropTypes.string,
        countDocs: PropTypes.number.isRequired,
        id: PropTypes.number,
    };

    handleDragOver = (e) => {
        if ((this.props.source === dragSource.file || this.props.source === dragSource.folder) && this.props.allowDrag) {
            e.preventDefault();
        }
    };

    handleDrop = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
            this.props.deleteDocs(makeUrls.makeCustomFile(this.props.id), this.props.id);
            this.props.dropOver();
        }
        if (this.props.source === dragSource.folder && this.props.allowDrag) {
            this.props.deleteFolders(makeUrls.makeCustomFolder(this.props.id), this.props.id, this.props.root);
            this.props.dropOver();
        }
    };

    handleOpenDelete = () => {
        if (this.props.countDocs) {
            this.props.modalOpen();
            this.props.setModal(modalType.documentDelete);
        }
    };

    renderTrash() {
        if (this.props.source === dragSource.file || this.props.source === dragSource.folder) {
            if (this.props.allowDrag) {
                return items.trashGood;
            }
            return items.trashBad;
        }
        return items.trash;
    }

    render() {
        return (
            <img className="item-right"
                 src={ this.renderTrash() }
                 onDragOver={ this.handleDragOver }
                 onDrop={ this.handleDrop }
                 onClick={ this.handleOpenDelete }
        />)
    }
}

const mapStoreToProps = state => ({
    // isLoading: state.folder.isLoading,
    // folderList: state.folder.folderList,
    // folderTileList: state.folder.folderTileList,
    // page: state.folder.page,
    // count: state.folder.count,
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    id: state.drag.id,
    // filter: state.page.filter.folder,
    // sort: state.page.sort.folder.name,
    // filterSelect: state.page.filterSelect.folder,
    // isLoadingMore: state.folder.isLoadingMore,
    // lang: state.page.lang,
    countDocs: state.document.countCheck,
    // sortDirect: state.page.sort.folder.isDirect,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        deleteDocs,
        dropOver,
        deleteFolders,
        modalOpen,
        setModal,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TrashComponent);