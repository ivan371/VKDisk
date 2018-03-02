import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../actions/modal';
import { createFolder } from '../actions/folder';
import CreateFolder from './folder/CreateFolder';

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
        return (
            <div className="modal-container" onClick={ this.onOpen }>
                <div className="modal" onClick={ this.onCancelOpen }>
                    <CreateFolder id={ this.props.id } />
                </div>
            </div>
        );
    }
}


const mapStoreToProps = (state, props) => ({
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
