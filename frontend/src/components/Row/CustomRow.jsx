import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    deleteFolders,
    filterFolders, folderUnMount, loadFilterFolders, loadFolders, loadFoldersMore,
    loadUnTreeFolders
} from '../../actions/folder';
import { apps, dragSource, folderType, items, makeUrls, urls } from '../../constants';
import Docs from '../document/Docs';
import { dropOver } from '../../actions/drag';
import {deleteDocs, loadChatRoot} from '../../actions/document';
import {changeSortDirection, loadUser, setFilter, setSort} from '../../actions/page';
import NodeChat from '../tree/NodeChat';
import NodeRoot from '../tree/NodeRoot';
import NodeTag from '../tree/NodeTag';
import RowHeader from './RowHeader';
import {modalOpen, setModal} from '../../actions/modal';


class CustomRowComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        loadUnTreeFolders: PropTypes.func.isRequired,
        folderUnMount: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        loadFoldersMore: PropTypes.func.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        loadFilterFolders: PropTypes.func.isRequired,
        filterFolders: PropTypes.func.isRequired,
        setSort: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
        countDocs: PropTypes.number.isRequired,
        loadChatRoot: PropTypes.func.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        changeSortDirection: PropTypes.func.isRequired,
    };

    state = {
        scroll: null,
    };

    componentDidMount() {
        this.props.loadUser(urls.user.currentUserUrl);
        if (this.props.params.hasOwnProperty('id')) {
            if (this.props.folder === folderType.chat) {
                this.props.loadUnTreeFolders(urls.folder.chatFolderUrl).then(this.scrollStart);
            }
            else {
                this.props.loadFilterFolders(makeUrls.makeRootFoldersFolder())
                    .then(() => this.props.filterFolders(parseInt(this.props.params.id)));
            }
        } else {
            if (this.props.folder === folderType.chat) {
                this.props.loadChatRoot();
                this.props.loadUnTreeFolders(urls.folder.chatFolderUrl).then(this.scrollStart);
            }
            if (this.props.folder === folderType.root) {
                this.props.loadFilterFolders(makeUrls.makeRootFoldersFolder())
                    .then(() => this.props.filterFolders(null));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter && this.props.folder === folderType.chat) {
            this.props.loadUnTreeFolders(makeUrls.makeFilterSortChats(nextProps.filter, this.props.sort, !this.props.sortDirect));
        }
        if (this.props.sort !== nextProps.sort && this.props.folder === folderType.chat) {
            this.props.loadUnTreeFolders(makeUrls.makeFilterSortChats(this.props.filter, nextProps.sort, !this.props.sortDirect));
        }
        if (this.props.sortDirect !== nextProps.sortDirect && this.props.folder === folderType.chat) {
            this.props.loadUnTreeFolders(makeUrls.makeFilterSortChats(this.props.filter, this.props.sort, !nextProps.sortDirect));
        }
    }

    componentWillUnmount() {
        this.props.folderUnMount();
    }

    handleLoadMore = (e) => {
        this.props.loadFoldersMore(makeUrls.makeFilterChatsSortMore(this.props.page, this.props.filter, this.props.sort, !this.props.sortDirect));
    };

    handleScroll = () => {
        if (!this.props.isLoadingMore && this.props.isLoading && this.props.count > (15 * (this.props.page - 1))) {
            const { scroll } = this.state;
            if (scroll.scrollHeight - scroll.scrollTop - scroll.offsetHeight < 10) {
                this.handleLoadMore();
            }
        }
    };

    scrollStart = () => {
        this.setState({ scroll: document.getElementsByClassName('page-content-content-wrap')[0] });
    };

    renderNodeList() {
        return [
            <NodeTag key="1" />,
            <NodeRoot key="2" folder={ this.props.folder } folderList={ this.props.folderList } />,
            <NodeChat key="3" folder={ this.props.folder } />,
        ];
    }

    render() {
        return (
            <div className="page-content-content">
                <div className="page-content-content-wrap">
                    <RowHeader
                        folder={this.props.folder}
                        filter={this.props.filter}
                        filterSelect={this.props.filterSelect}
                        setFilter={this.props.setFilter}
                        setSort={this.props.setSort}
                        sort={this.props.sort}
                        root={parseInt(this.props.params.id) || null}
                        lang={this.props.lang}
                        sortDirect={this.props.sortDirect}
                        changeSortDirection={this.props.changeSortDirection}
                    />
                    <div className="content-flex content-flex-column" onScroll={ this.handleScroll }>
                        {this.renderNodeList()}
                    </div>
                </div>
                <Docs params={ this.props.params } history={ this.props.history } folder={ this.props.folder } />
            </div>
        );
    }
}

const mapStoreToProps = state => ({
    isLoading: state.folder.isLoading,
    folderList: state.folder.folderList,
    folderTileList: state.folder.folderTileList,
    page: state.folder.page,
    count: state.folder.count,
    allowDrag: state.drag.allowDrag,
    source: state.drag.source,
    id: state.drag.id,
    filter: state.page.filter.folder,
    sort: state.page.sort.folder.name,
    filterSelect: state.page.filterSelect.folder,
    isLoadingMore: state.folder.isLoadingMore,
    lang: state.page.lang,
    countDocs: state.document.countCheck,
    sortDirect: state.page.sort.folder.isDirect,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadUnTreeFolders,
        folderUnMount,
        loadFoldersMore,
        setFilter,
        loadFilterFolders,
        filterFolders,
        setSort,
        loadUser,
        loadChatRoot,
        changeSortDirection
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CustomRowComponent);
