import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadFolders } from '../../actions/folder';
import { urls } from '../../constants';
import Folder from "./Folder";

class RootFolderComponent extends React.Component {
    componentDidMount() {
        this.props.loadFolders(urls.folder.foldersUrl);
    }
    render() {
        let folderList = [];
        if (this.props.isLoading) {
            folderList = this.props.folderList.map(folderId => <Folder id={folderId} key={folderId}>Папка</Folder>);
        }
        return (
            <div className="page-content-content-wrap">
                <div className="content-item">
                    <input type="text" placeholder="Search" />
                </div>
                {folderList}
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
)(RootFolderComponent);
