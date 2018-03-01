import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadFolders } from '../../actions/folder';
import { folderType, urls } from '../../constants';
import Folder from '../folder/Folder';
import Docs from '../document/Docs';

class CustomRowComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        switch (this.props.folder) {
            case folderType.chat:
                this.props.loadFolders(urls.folder.chatFolderUrl);
                break;
            case folderType.root:
                this.props.loadFolders(urls.folder.foldersUrl);
                break;
            default:
        }
    }
    render() {
        let folderList = [];
        if (this.props.isLoading) {
            folderList = this.props.folderList.map(folderId => (<Folder
                id={ folderId }
                key={ folderId }
                folder={ this.props.folder }
            >Папка</Folder>));
        }
        return (
            <div className="page-content-content">
                <div className="page-content-content-wrap">
                    <div className="content-item">
                        <input type="text" placeholder="Search" />
                    </div>
                    {folderList}
                </div>
                <Docs params={ this.props.params } />
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.folder.isLoading,
    folderList: state.folder.folderList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadFolders,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CustomRowComponent);
