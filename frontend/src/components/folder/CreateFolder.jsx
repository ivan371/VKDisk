import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../../actions/modal';
import { createFolder } from '../../actions/folder';
import { folderType, format, makeUrls } from '../../constants';

class CreateFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        modalOpen: PropTypes.func.isRequired,
        createFolder: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
    };

    state = {
        title: '',
    };

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.handleCreate();
        }
    };

    handleCreate = (e) => {
        if (this.props.folder === folderType.folder) {
            this.props.createFolder(makeUrls.makeFilterFoldersFolder(this.props.id), this.state.title);
        }
        if (this.props.folder === folderType.root) {
            this.props.createFolder(makeUrls.makeRootFoldersFolder(), this.state.title);
        }
        this.props.modalOpen();
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p>New folder</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-content__img">
                        <img src={ format.folder } />
                    </div>
                    <div className="modal-input">
                        <input
                            name="title"
                            value={ this.state.title }
                            className="vk-input"
                            onChange={ this.handleChange }
                            onKeyDown={ this.handleEnter }
                            placeholder="enter a folder name"
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="vk-button" onClick={ this.handleCreate }>Create</button>
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
