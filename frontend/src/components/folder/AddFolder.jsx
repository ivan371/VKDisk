import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../../actions/modal';
import Modal from '../Modal';

class AddFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
    };

    onOpen = () => {
        this.props.modalOpen();
    };

    render() {
        let modal = null;
        if (this.props.isOpen) {
            modal = <Modal />;
        }
        return (
            <React.Fragment>
                <div className="content-flex-item">
                    {modal}
                    <img className="icon" onClick={ this.onOpen } src={ this.props.imgUrl } />
                </div>
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
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(AddFolderComponent);
