import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchFolder, updateFolder } from '../../actions/folder';
import { format, makeUrls, tileType, makeFormat, apps, folderType, dragSource } from '../../constants';
import { checkFile, updateDoc, updateDocRoot } from '../../actions/document';
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
        source: PropTypes.string,
        dragId: PropTypes.number,
        allowDrag: PropTypes.bool.isRequired,
        updateDocRoot: PropTypes.func.isRequired,
    };

    state = {
        isClicked: false,
        title: this.props.title,
        isChecked: true,
    };

    handleChangeClick = (e) => {
        this.setState({ isClicked: !this.state.isClicked });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleUpdate = (e) => {
        if (e.keyCode === 13) {
            switch (this.props.type) {
                case tileType.folder:
                    this.props.updateFolder(makeUrls.makeCustomFolder(this.props.id), this.state.title);
                    break;
                case tileType.file:
                    this.props.updateDoc(makeUrls.makeCustomFile(this.props.id), this.state.title);
                    break;
                default:
            }
            this.onHandleChange(e);
        }
    };

    handleDragStart = (e) => {
        switch (this.props.type) {
            case tileType.file:
                this.props.dragStart(this.props.folder !== folderType.chat, dragSource.file, this.props.id);
                break;
            case tileType.folder:
                this.props.dragStart(this.props.folder === folderType.folder, dragSource.favorite, this.props.id);
                break;
            default:
        }
    };

    handleDragEnd = (e) => {
        this.props.dragEnd();
    };

    handleDragOver = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
            e.preventDefault();
        }
    };

    handleDrop = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
            this.props.updateDocRoot(makeUrls.makeTransferFile(this.props.dragId), this.props.id);
            this.props.dropOver();
        }
    };


    handleClick = (e) => {
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
            // this.setState({ isChecked: !this.state.isChecked });
            this.props.checkFile(this.props.id);
        } else {
            this.props.switchFolder(this.props.id);
        }
    };

    renderClassName() {
        const itemClass = 'content-flex-item';
        if (this.props.isModal) {
            return `${itemClass} ${this.props.id !== this.props.checkedFolder ? '' : 'checked'}`;
        }
        if (this.props.type === tileType.file) {
            if (this.props.checkList.indexOf(this.props.id) !== -1) {
                return `${itemClass} checked`;
            }
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
                className="icon"
                onClick={ this.handleClick }
                onDragStart={ this.handleDragStart }
                src={ imageUrl }
                draggable="true"
                onDragEnd={ this.handleDragEnd }
            />);
        }
        if (this.props.type === tileType.folder) {
            return (<img
                className="icon"
                onClick={ this.handleClick }
                src={ imageUrl }
                onDragOver={ this.handleDragOver }
                onDrop={ this.handleDrop }
            />);
        }
        return null;
    }

    render() {
        return (
            <div className={ this.renderClassName() }>
                { this.renderItem() }
                {!this.state.isClicked ?
                    <div className="content-item__title" onClick={ this.handleChangeClick }>{this.props.title}</div>
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
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    dragId: state.drag.id,
    view: state.page.view,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        updateFolder,
        updateDoc,
        checkFile,
        switchFolder,
        setLink,
        dragStart,
        dragEnd,
        dropOver,
        updateDocRoot,
    }, dispatch),
});


export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TileComponent));
