import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadFolders } from '../../actions/folder';
import { urls } from '../../constants';
import Folder from './Folder';
import Docs from '../document/Docs';

class RootFolderComponent extends React.Component {
    componentDidMount() {
        this.props.loadFolders(urls.folder.foldersUrl);
    }
    render() {
        let folderList = [];
        if (this.props.isLoading) {
            folderList = this.props.folderList.map(folderId => <Folder id={ folderId } key={ folderId }>Папка</Folder>);
        }
        return (
            <div className="page-content-content">
                <div className="page-content-content-wrap">
                    <div className="content-item">
                        <input type="text" placeholder="Search" />
                    </div>
                    {folderList}
                </div>
                <Docs params={ this.props.match.params } />
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
