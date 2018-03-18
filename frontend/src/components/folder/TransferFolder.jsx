import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FoldersTile from '../tile/FoldersTile';
import { loadTransferFolders } from '../../actions/folder';
import { makeUrls, modalType, urls } from '../../constants';
import {bulkCreateDocs, bulkUpdateDocs} from '../../actions/document';
import { modalOpen } from '../../actions/modal';

class CreateFolderComponent extends React.Component {
    static propTypes = {
        loadTransferFolders: PropTypes.func.isRequired,
        bulkCreateDocs: PropTypes.func.isRequired,
        bulkUpdateDocs: PropTypes.func.isRequired,
        checkedFolder: PropTypes.number,
        modalOpen: PropTypes.func.isRequired,
        checkList: PropTypes.array.isRequired,
        modal: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.loadTransferFolders(urls.folder.folderFolderUrl);
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
                            <p>Переместить файлы</p> : <p>Копировать файлы</p>}
                    </div>
                </div>
                <div className="modal-content">
                    <div className="content-flex-modal">
                        <FoldersTile isModal />
                    </div>
                    {this.props.modal !== modalType.folderTransfer ?
                        <button className="vk-button" onClick={ this.handleBulkUpdate }>Переместить</button> :
                        <button className="vk-button" onClick={ this.handleBulkCreate }>Копировать</button>}
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = state => ({
    checkedFolder: state.folder.checkedFolder,
    checkList: state.document.checkList,
    modal: state.modal.modal,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadTransferFolders,
        bulkCreateDocs,
        bulkUpdateDocs,
        modalOpen,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CreateFolderComponent);
