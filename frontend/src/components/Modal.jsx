import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {modalOpen} from "../actions/modal";

class ModalComponent extends React.Component {
    static propTypes = {
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
                <div className="modal" onClick={this.onCancelOpen}>
                    <div className="modal-header">
                        <div className="modal-header-title">
                            <p>Новая папка</p>
                        </div>
                    </div>
                    <div className="modal-content">
                        <div className="modal-content__img">
                            <img src="/static/img/folder.png"/>
                        </div>
                        <div className="modal-input">
                            <input className="vk-input"/>
                        </div>
                        <div className="modal-footer">
                            <button className="vk-button">Создать</button>
                        </div>
                    </div>
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
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(ModalComponent);
