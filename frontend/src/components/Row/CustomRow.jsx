import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {folderUnMount, loadFolders, loadFoldersMore} from '../../actions/folder';
import {folderType, makeUrls, urls} from '../../constants';
import Folder from '../folder/Folder';
import Docs from '../document/Docs';

class CustomRowComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loadFolders: PropTypes.func.isRequired,
        folderUnMount: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        loadFoldersMore: PropTypes.func.isRequired,
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

    handleLoadMore = (e) => {
        this.props.loadFoldersMore(makeUrls.makeChatsMore(this.props.page));
    };
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
                    { this.props.isLoading && this.props.count > (10 * (this.props.page - 1)) ? <div>
                        <button onClick={ this.handleLoadMore }>Показать еще</button>
                    </div> : null }
                </div>
                <Docs params={ this.props.params } history={ this.props.history } folder={ this.props.folder } />
            </div>
        );
    }
}

const mapStoreToProps = state => ({
    isLoading: state.folder.isLoading,
    folderList: state.folder.folderList,
    page: state.folder.page,
    count: state.folder.count,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadFolders,
        folderUnMount,
        loadFoldersMore,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CustomRowComponent);
