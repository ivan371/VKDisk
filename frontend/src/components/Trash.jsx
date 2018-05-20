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
        count: PropTypes.number.isRequired,
        id: PropTypes.number,
        checkList: PropTypes.array,
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
        if (!this.props.countDocs && this.props.count === 1) {
            this.props.deleteFolders(makeUrls.makeCustomFolder(this.props.checkList[0]), this.props.checkList[0], this.props.root);
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
    count: state.folder.countCheck,
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    id: state.drag.id,
    countDocs: state.document.countCheck,
    checkList: state.folder.checkList,
    root: state.drag.id ? state.folder.folders[state.drag.id].root: null,
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