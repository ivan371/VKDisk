import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen, setModal } from '../../actions/modal';
import Modal from '../Modal';
import {items, modalType} from '../../constants';

class AddFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
    };

    onOpen = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderCreate);
    };

    render() {
        let modal = null;
        if (this.props.isOpen) {
            modal = <Modal id={ this.props.id } />;
        }
        return (
            <React.Fragment>
                {modal}
                <img className="item-right" onClick={ this.onOpen } src={ items.add } />
            </React.Fragment>
        );
    }
}


const mapStoreToProps = (state, props) => ({
    isOpen: state.modal.isOpen,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(AddFolderComponent);
