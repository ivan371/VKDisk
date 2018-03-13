import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { folderUnMount, loadFolders, loadFoldersMore } from '../../actions/folder';
import { apps, dragSource, folderType, items, makeUrls, urls } from '../../constants';
import Folder from '../folder/Folder';
import Docs from '../document/Docs';
import { dropOver } from '../../actions/drag';
import { deleteDocs } from '../../actions/document';
import { setFilter } from '../../actions/page';


class CustomRowComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loadFolders: PropTypes.func.isRequired,
        folderUnMount: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        loadFoldersMore: PropTypes.func.isRequired,
        source: PropTypes.string,
        allowDrag: PropTypes.bool.isRequired,
        dropOver: PropTypes.func.isRequired,
        deleteDocs: PropTypes.func.isRequired,
        id: PropTypes.number,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: this.props.filterSelect,
    };

    componentDidMount() {
        switch (this.props.folder) {
            case folderType.chat:
                this.props.loadFolders(urls.folder.chatFolderUrl);
                break;
            default:
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter && this.props.folder === folderType.chat) {
            this.props.loadFolders(makeUrls.makeFilterChats(nextProps.filter));
        }
    }

    componentWillUnmount() {
        this.props.folderUnMount();
    }

    handleLoadMore = (e) => {
        this.props.loadFoldersMore(makeUrls.makeChatsMore(this.props.page));
    };

    handleDragOver = (e) => {
        if (this.props.source === dragSource.delete && this.props.allowDrag) {
            e.preventDefault();
        }
    };

    handleDrop = (e) => {
        if (this.props.source === dragSource.delete && this.props.allowDrag) {
            this.props.deleteDocs(makeUrls.makeCustomFile(this.props.id), this.props.id);
            this.props.dropOver();
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFilter = (e) => {
        if (e.keyCode === 13) {
            this.props.setFilter(this.state.filter, this.state.filterSelect, apps.folder);
        }
    };

    renderTrash() {
        if (this.props.source === dragSource.delete) {
            if (this.props.allowDrag) {
                return items.trashGood;
            }
            return items.trashBad;
        }
        return items.trash;
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
                        <input
                            className="content-item__input"
                            type="text"
                            placeholder="Search"
                            name="filter"
                            value={ this.state.filter }
                            onChange={ this.handleChange }
                            onKeyDown={ this.handleFilter }
                        />
                        <img className="item-right" src={ this.renderTrash() } onDragOver={ this.handleDragOver } onDrop={ this.handleDrop } />
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
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    id: state.drag.id,
    filter: state.page.filter.folder,
    filterSelect: state.page.filterSelect.folder,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadFolders,
        folderUnMount,
        loadFoldersMore,
        dropOver,
        deleteDocs,
        setFilter,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CustomRowComponent);
