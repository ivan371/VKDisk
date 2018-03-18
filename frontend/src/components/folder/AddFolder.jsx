import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen, setModal } from '../../actions/modal';
import Modal from '../Modal';
import {folderType, items, modalType} from '../../constants';

class AddFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        folder: PropTypes.string.isRequired,
    };

    onOpen = () => {
        this.props.modalOpen();
        if (this.props.folder === folderType.root) {
            this.props.setModal(modalType.folderRootCreate);
        } else {
            this.props.setModal(modalType.folderCreate);
        }
    };

    render() {
        let modal = null;
        console.log(this.props.folder, folderType.root);
        if (this.props.isOpen) {
            if (this.props.folder === folderType.root) {
                modal = <Modal />;
            } else {
                modal = <Modal id={ this.props.id }/>;
            }
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
