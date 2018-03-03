import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../actions/modal';
import { createFolder } from '../actions/folder';
import CreateFolder from './folder/CreateFolder';
import { modalType } from '../constants';
import TransferFolder from './folder/TransferFolder';

class ModalComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
    };

    onOpen = () => {
        this.props.modalOpen();
    };

    onCancelOpen = (e) => {
        e.stopPropagation();
    };

    render() {
        let modal = null;
        switch (this.props.modal) {
            case modalType.folderCreate:
                modal = <CreateFolder id={ this.props.id } />;
                break;
            case modalType.folderTransfer:
                modal = <TransferFolder id={ this.props.id } />;
                break;
            default:
        }
        return (
            <div className="modal-container" onClick={ this.onOpen }>
                <div className="modal" onClick={ this.onCancelOpen }>
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
