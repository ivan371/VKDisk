import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../actions/modal';
import { createFolder } from '../actions/folder';
import CreateFolder from './folder/CreateFolder';
import {folderType, modalType} from '../constants';
import TransferFolder from './folder/TransferFolder';

class ModalComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        modalOpen: PropTypes.func.isRequired,
        modal: PropTypes.string.isRequired,
    };

    handleOpen = () => {
        this.props.modalOpen();
    };

    handleCancelOpen = (e) => {
        e.stopPropagation();
    };

    render() {
        let modal = null;
        switch (this.props.modal) {
            case modalType.folderCreate:
                modal = <CreateFolder id={ this.props.id } folder={ folderType.folder } />;
                break;
            case modalType.folderRootCreate:
                modal = <CreateFolder folder={ folderType.root } />;
                break;
            case modalType.folderTransfer:
                modal = <TransferFolder />;
                break;
            case modalType.folderReplace:
                modal = <TransferFolder />;
                break;
            default:
        }
        return (
            <div className="modal-container" onClick={ this.handleOpen }>
                <div className="modal" onClick={ this.handleCancelOpen }>
                    {modal}
                </div>
            </div>
        );
    }
}


const mapStoreToProps = (state, props) => ({
    modal: state.modal.modal,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        createFolder,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(ModalComponent);
