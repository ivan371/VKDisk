import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FoldersTile from '../tile/FoldersTile';
import { loadTransferFolders, transferUnMount } from '../../actions/folder';
import { folderType, makeUrls, modalType, urls } from '../../constants';
import { bulkCreateDocs, bulkUpdateDocs } from '../../actions/document';
import { modalOpen } from '../../actions/modal';
import {setLink} from "../../actions/page";
import {language} from '../language';

class CreateFolderComponent extends React.Component {
    static propTypes = {
        loadTransferFolders: PropTypes.func.isRequired,
        bulkCreateDocs: PropTypes.func.isRequired,
        bulkUpdateDocs: PropTypes.func.isRequired,
        checkedFolder: PropTypes.number,
        modalOpen: PropTypes.func.isRequired,
        checkList: PropTypes.array.isRequired,
        modal: PropTypes.string.isRequired,
        setLink: PropTypes.func.isRequired,
        link: PropTypes.string.isRequired,
        transferUnMount: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.loadTransferFolders(urls.folder.transferFolderUrl);
        this.props.setLink(urls.folder.transferFolderUrl);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.link !== nextProps.link) {
            this.props.loadTransferFolders(nextProps.link);
        }
    }

    componentWillUnmount() {
        this.props.transferUnMount();
    }

    handleBulkCreate = () => {
        this.props.bulkCreateDocs(makeUrls.makeCopyDocs(this.props.checkedFolder), this.props.checkList);
        this.props.modalOpen();
    };

    handleBulkUpdate = () => {
        this.props.bulkUpdateDocs(makeUrls.makeReplaceDocs(this.props.checkedFolder), this.props.checkList);
        this.props.modalOpen();
    };

    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        {this.props.modal !== modalType.folderTransfer ?
                            <p>{language.replaceFiles[this.props.lang]}</p> : <p>{language.copyFiles[this.props.lang]}</p>}
                    </div>
                </div>
                <div className="modal-content">
                    <div className="content-flex-modal">
                        {this.props.isLoading ?
                        <FoldersTile isModal folder={ folderType.modal } /> :
                            <div className="load">
                                <div className="line"/>
                                <div className="line"/>
                                <div className="line"/>
                            </div>}
                    </div>
                    {this.props.modal !== modalType.folderTransfer ?
                        <button className="vk-button" onClick={ this.handleBulkUpdate }>{language.replace[this.props.lang]}</button> :
                        <button className="vk-button" onClick={ this.handleBulkCreate }>{language.copy[this.props.lang]}</button>}
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = state => ({
    checkedFolder: state.folder.checkedFolder,
    checkList: state.document.checkList,
    modal: state.modal.modal,
    link: state.page.link.modal,
    isLoading: state.folder.isTransferLoading,
    lang: state.page.lang,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadTransferFolders,
        bulkCreateDocs,
        bulkUpdateDocs,
        modalOpen,
        setLink,
        transferUnMount,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CreateFolderComponent);
