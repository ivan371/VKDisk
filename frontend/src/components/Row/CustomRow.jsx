import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {folderUnMount, loadFolders} from '../../actions/folder';
import { folderType, urls } from '../../constants';
import Folder from '../folder/Folder';
import Docs from '../document/Docs';

class CustomRowComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loadFolders: PropTypes.func.isRequired,
        folderUnMount: PropTypes.func.isRequired,
    };

    componentDidMount() {
        switch (this.props.folder) {
            case folderType.chat:
                this.props.loadFolders(urls.folder.chatFolderUrl);
                break;
            default:
        }
    }

    componentWillUnmount() {
        this.props.folderUnMount();
    }
    render() {
        let folderList = [];
        if (this.props.isLoading || this.props.folder === folderType.root) {
            folderList = this.props.folderList.map(folderId => (<Folder
                id={ folderId }
                key={ folderId }
                folder={ this.props.folder }
            >Папка
            </Folder>));
        }
        return (
            <div className="page-content-content">
                <div className="page-content-content-wrap">
                    <div className="content-item">
                        <input className="content-item__input" type="text" placeholder="Search" />
                    </div>
                    {folderList}
                </div>
                <Docs params={ this.props.params } history={ this.props.history } folder={ this.props.folder } />
            </div>
        );
    }
}

const mapStoreToProps = state => ({
    isLoading: state.folder.isLoading,
    folderList: state.folder.folderList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadFolders,
        folderUnMount,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CustomRowComponent);
