import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchFolder, updateFolder } from '../../actions/folder';
import { format, makeUrls, tileType, makeFormat, apps, folderType, dragSource } from '../../constants';
import { checkFile, updateDoc } from '../../actions/document';
import { setLink } from '../../actions/page';
import { dragEnd, dragStart } from '../../actions/drag';

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
        folder: PropTypes.string,
        checkList: PropTypes.array.isRequired,
    };

    state = {
        isClicked: false,
        title: this.props.title,
        isChecked: true,
    };

    onHandleChange = (e) => {
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
                this.props.dragStart(this.props.folder === folderType.folder, dragSource.delete, this.props.id);
                break;
            case tileType.folder:
                this.props.dragStart(this.props.folder !== folderType.chat, dragSource.favorite, this.props.id);
                break;
            default:
        }
    };

    handleDragEnd = (e) => {
        this.props.dragEnd();
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
        if (this.props.isModal) {
            return `content-flex-item ${this.props.id !== this.props.checkedFolder ? '' : 'checked'}`;
        }
        if (this.props.type === tileType.file) {
            if (this.props.checkList.indexOf(this.props.id) !== -1) {
                return 'content-flex-item checked';
            }
        }
        return `content-flex-item ${this.state.isChecked ? '' : 'checked'}`;
    }

    render() {
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
        return (
            <div className={ this.renderClassName() }>
                <img
                    className="icon"
                    onClick={ this.handleClick }
                    onDragStart={ this.handleDragStart }
                    src={ imageUrl }
                    draggable="true"
                    onDragEnd={ this.handleDragEnd }
                />
                {!this.state.isClicked ?
                    <div className="content-item__title" onClick={ this.onHandleChange }>{this.props.title}</div>
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
    }, dispatch),
});


export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TileComponent));
