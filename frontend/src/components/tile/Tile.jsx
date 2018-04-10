import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {checkFolder, renameFolder, switchFolder, updateFolder, updateFolderRoot} from '../../actions/folder';
import { format, makeUrls, tileType, makeFormat, apps, folderType, dragSource, view } from '../../constants';
import { checkFile, renameDoc, updateDoc, updateDocRoot } from '../../actions/document';
import { setLink } from '../../actions/page';
import { dragEnd, dragStart, dropOver } from '../../actions/drag';

class TileComponent extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        updateFolder: PropTypes.func.isRequired,
        updateDoc: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        checkFile: PropTypes.func.isRequired,
        isModal: PropTypes.bool.isRequired,
        switchFolder: PropTypes.func.isRequired,
        checkedFolder: PropTypes.number,
        setLink: PropTypes.func.isRequired,
        dragStart: PropTypes.func.isRequired,
        dragEnd: PropTypes.func.isRequired,
        dropOver: PropTypes.func.isRequired,
        folder: PropTypes.string,
        checkList: PropTypes.array.isRequired,
        checkListFolder: PropTypes.array.isRequired,
        source: PropTypes.string,
        dragId: PropTypes.number,
        allowDrag: PropTypes.bool.isRequired,
        updateDocRoot: PropTypes.func.isRequired,
        updateFolderRoot: PropTypes.func.isRequired,
        view: PropTypes.string.isRequired,
        renamedIdFile: PropTypes.number,
        renamedIdFolder: PropTypes.number,
        renameDoc: PropTypes.func.isRequired,
        renameFolder: PropTypes.func.isRequired,
        checkFolder: PropTypes.func.isRequired,
        countCheckFolder: PropTypes.number.isRequired,
        countCheckFile: PropTypes.number.isRequired,
    };

    state = {
        title: this.props.title,
        isChecked: true,
    };

    componentDidUpdate(lastProps) {
        if (this.props.countCheckFile !== lastProps.countCheckFile ||
            this.props.countCheckFolder !== lastProps.countCheckFolder) {
            if (this.isEmptyCheck()) {
                this.setState({ isChecked: true });
            }
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleUpdate = (e) => {
        if (e.keyCode === 13) {
            switch (this.props.type) {
                case tileType.folder:
                    this.props.updateFolder(makeUrls.makeCustomFolder(this.props.id), this.state.title);
                    this.props.renameFolder();
                    break;
                case tileType.file:
                    this.props.updateDoc(makeUrls.makeCustomFile(this.props.id), this.state.title);
                    this.props.renameDoc();
                    break;
                default:
            }
            this.handleChange(e);
        }
    };

    handleDragStart = (e) => {
        switch (this.props.type) {
            case tileType.file:
                this.props.dragStart(this.props.folder !== folderType.chat, dragSource.file, this.props.id);
                break;
            case tileType.folder:
                this.props.dragStart(this.props.folder !== folderType.chat, dragSource.folder, this.props.id);
                break;
            default:
        }
    };

    handleDragEnd = (e) => {
        this.props.dragEnd();
    };

    handleDragOver = (e) => {
        if ((this.props.source === dragSource.file || this.props.source === dragSource.folder) && this.props.allowDrag) {
            e.preventDefault();
        }
    };

    handleDrop = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
            this.props.updateDocRoot(makeUrls.makeTransferFile(this.props.dragId), this.props.id);
            this.props.dropOver();
        }

        if (this.props.source === dragSource.folder && this.props.allowDrag) {
            this.props.updateFolderRoot(makeUrls.makeTransferFolder(this.props.dragId), this.props.id);
            this.props.dropOver();
        }
    };


    handleClick = (e) => {
        this.setState({ isChecked: !this.state.isChecked });
        if (!this._delayedClick) {
            this._delayedClick = _.debounce(this.doClick, 500);
        }
        if (this.clickedOnce) {
            this._delayedClick.cancel();
            this.clickedOnce = false;
            if (this.props.isModal) {
                this.props.setLink(this.props.url, apps.modal);
            } else {
                switch (this.props.type) {
                    case tileType.file:
                        window.open(this.props.url);
                        break;
                    case tileType.folder:
                        this.props.history.push(this.props.url);
                        break;
                    default:
                }
            }
        } else {
            this._delayedClick(e);
            this.clickedOnce = true;
        }
    };

    doClick = (e) => {
        this.clickedOnce = undefined;
        if (!this.props.isModal) {
            if (this.props.type === tileType.file) {
                this.props.checkFile(this.props.id);
            } else if (this.props.type === tileType.folder) {
                this.props.checkFolder(this.props.id);
            }
        } else {
            this.props.switchFolder(this.props.id);
        }
    };

    isEmptyCheck() {
        if (this.props.type === tileType.file) {
            return !this.props.countCheckFile;
        }
        if (this.props.type === tileType.folder) {
            return !this.props.countCheckFolder;
        }
        return 0;
    }

    isRenamed() {
        if (this.props.type === tileType.file) {
            return this.props.id === this.props.renamedIdFile;
        }
        if (this.props.type === tileType.folder) {
            return this.props.id === this.props.renamedIdFolder;
        }
        return false;
    }

    renderClassName() {
        let itemClass = 'content-flex-item';
        if (this.props.view === view.col) {
            itemClass = 'content-flex-item content-flex-item-column';
        }
        if (this.props.isModal) {
            return `${itemClass} ${this.props.id !== this.props.checkedFolder ? '' : 'checked'}`;
        }
        return `${itemClass} ${this.state.isChecked ? '' : 'checked'}`;
    }

    renderItem() {
        let imageUrl = null;
        switch (this.props.type) {
            case tileType.folder:
                imageUrl = format.folder;
                break;
            case tileType.file:
                imageUrl = makeFormat(this.props.title);
                break;
            default:
        }
        if (this.props.type === tileType.file) {
            return (<img
                className={ this.props.view === view.col ? 'item' : 'icon' }
                style={ this.props.view === view.col ? { float: 'left' } : null }
                onDragStart={ this.handleDragStart }
                src={ imageUrl }
                draggable="true"
                onDragEnd={ this.handleDragEnd }
            />);
        }
        if (this.props.type === tileType.folder) {
            return (<img
                style={ this.props.view === view.col ? { float: 'left' } : null }
                className={ this.props.view === view.col ? 'item' : 'icon' }
                onDragStart={ this.handleDragStart }
                src={ imageUrl }
                onDragOver={ this.handleDragOver }
                draggable="true"
                onDrop={ this.handleDrop }
                onDragEnd={ this.handleDragEnd }
            />);
        }
        return null;
    }

    render() {
        return (
            <div className={ this.renderClassName() } onClick={ this.handleClick } >
                { this.renderItem() }
                {!this.isRenamed() ?
                    <div
                        className={ this.props.view === view.col ? 'content-item__title content-item__title-col' : 'content-item__title' }
                    >{this.props.title}
                    </div>
                    : <input
                        className="content-item__input"
                        value={ this.state.title }
                        onChange={ this.handleChange }
                        onKeyDown={ this.handleUpdate }
                        name="title"
                    />
                }
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    checkedFolder: state.folder.checkedFolder,
    checkList: state.document.checkList,
    checkListFolder: state.folder.checkList,
    countCheckFolder: state.folder.countCheck,
    countCheckFile: state.document.countCheck,
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    dragId: state.drag.id,
    view: state.page.view,
    renamedIdFile: state.document.renamedId,
    renamedIdFolder: state.folder.renamedId,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        updateFolder,
        updateDoc,
        checkFile,
        checkFolder,
        switchFolder,
        setLink,
        dragStart,
        dragEnd,
        dropOver,
        updateDocRoot,
        updateFolderRoot,
        renameDoc,
        renameFolder,
    }, dispatch),
});


export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TileComponent));
