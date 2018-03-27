import React from 'react';
import PropTypes from 'prop-types';
import { modalType, items } from '../../constants';

export default class DocsCheckHeader extends React.Component {
    static propTypes = {
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        countCheckFile: PropTypes.number.isRequired,
        countCheckFolder: PropTypes.number.isRequired,
        checkAllFiles: PropTypes.func.isRequired,
        checkAllFolders: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        renameDoc: PropTypes.func.isRequired,
        renameFolder: PropTypes.func.isRequired,
    };

    handleOpenCopy = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };

    handleOpenReplace = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderReplace);
    };

    handleOpenDelete = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.documentDelete);
    };

    handleClearAllFiles = () => {
        this.props.checkAllFiles();
    };

    handleClearAllFolders = () => {
        this.props.checkAllFolders();
    };

    handleRenameDoc = () => {
        this.props.renameDoc();
    };

    handleRenameFolder = () => {
        this.props.renameFolder();
    };

    renderCountCheckFiles() {
        if (this.props.countCheckFile) {
            return (<React.Fragment>
                <div className="item-name">{this.props.countCheckFile} files</div>
                <img src={ items.clear } className="item-left" onClick={ this.handleClearAllFiles } />
            </React.Fragment>);
        }
        return null;
    }

    renderCountCheckFolders() {
        if (this.props.countCheckFolder) {
            return (<React.Fragment>
                <div className="item-name">{this.props.countCheckFolder} folders</div>
                <img src={ items.clear } className="item-left" onClick={ this.handleClearAllFolders } />
            </React.Fragment>);
        }
        return null;
    }

    render() {
        if (this.props.type !== 'chat') {
            return (<React.Fragment>
                {this.renderCountCheckFiles()} {this.renderCountCheckFolders()}
                {!this.props.countCheckFolder ?
                    <React.Fragment>
                        <button className="vk-button" onClick={ this.handleOpenCopy }>Copy</button>
                        <button className="vk-button" onClick={ this.handleOpenReplace }>Replace</button>
                        <button className="vk-button" onClick={ this.handleOpenDelete }>Delete</button>
                    </React.Fragment> : null}
                { this.props.countCheckFile === 1 && !this.props.countCheckFolder ? <button className="vk-button" onClick={ this.handleRenameDoc }>Rename</button> : null }
                { this.props.countCheckFolder === 1 && !this.props.countCheckFile ? <button className="vk-button" onClick={ this.handleRenameFolder }>Rename</button> : null }
            </React.Fragment>);
        }
        return (<React.Fragment>
            {this.renderCountCheckFiles()} {this.renderCountCheckFolders()}
            {!this.props.countCheckFolder ?
                <React.Fragment>
                    <button className="vk-button" onClick={ this.handleOpenCopy }>Copy</button>
                </React.Fragment> : null}
            { this.props.countCheckFile === 1 && !this.props.countCheckFolder ? <button className="vk-button" onClick={ this.handleRenameDoc }>Rename</button> : null }
            { this.props.countCheckFolder === 1 && !this.props.countCheckFile ? <button className="vk-button" onClick={ this.handleRenameFolder }>Rename</button> : null }
        </React.Fragment>);
    }
}
