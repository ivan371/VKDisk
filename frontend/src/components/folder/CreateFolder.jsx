import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../../actions/modal';
import { createFolder } from '../../actions/folder';
import { makeUrls } from '../../constants';

class CreateFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
        createFolder: PropTypes.func.isRequired,
    };

    state = {
        title: '',
    };

    onCreate = (e) => {
        this.props.createFolder(makeUrls.makeFilterFoldersFolder(this.props.id), this.state.title);
        this.props.modalOpen();
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p>Новая папка</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-content__img">
                        <img src="/static/img/folder.png" />
                    </div>
                    <div className="modal-input">
                        <input name="title" value={ this.state.title } className="vk-input" onChange={ this.onChange } />
                    </div>
                    <div className="modal-footer">
                        <button className="vk-button" onClick={ this.onCreate }>Создать</button>
                    </div>
                </div>
            </React.Fragment>
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
)(CreateFolderComponent);
