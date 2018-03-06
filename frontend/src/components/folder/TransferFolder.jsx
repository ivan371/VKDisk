import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FoldersTile from '../tile/FoldersTile';
import { loadTransferFolders } from '../../actions/folder';
import { makeUrls, urls } from '../../constants';
import { bulkCreateDocs } from '../../actions/document';
import { modalOpen } from '../../actions/modal';

class CreateFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        loadTransferFolders: PropTypes.func.isRequired,
        bulkCreateDocs: PropTypes.func.isRequired,
        checkedFolder: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
        checkList: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.loadTransferFolders(urls.folder.sortFolderUrl);
    }

    onBulkCreate = (e) => {
        this.props.bulkCreateDocs(makeUrls.makeCopyDocs(this.props.checkedFolder), this.props.checkList);
        this.props.modalOpen();
    };

    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p>Переместить файл</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="content-flex-modal">
                        <FoldersTile isModal />
                    </div>
                    <button className="vk-button" onClick={ this.onBulkCreate }>Переместить</button>
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = (state, props) => ({
    checkedFolder: state.folder.checkedFolder,
    checkList: state.document.checkList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadTransferFolders,
        bulkCreateDocs,
        modalOpen,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CreateFolderComponent);
