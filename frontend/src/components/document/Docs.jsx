import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { apps, folderType, makeUrls, urls, view } from '../../constants';
import { checkAll, docsUnMount, loadDocs, loadDocsMore } from '../../actions/document';
import { filterFolders, loadFilterFolders, loadRecursiveFolders } from '../../actions/folder';
import { modalOpen, setModal } from '../../actions/modal';
import FoldersTile from '../tile/FoldersTile';
import DocsTile from '../tile/DocsTile';
import DocsHeader from './DocsHeader';
import { changeView, clearFilter } from '../../actions/page';

class DocsComponent extends React.Component {
    static propTypes = {
        loadDocs: PropTypes.func.isRequired,
        loadFilterFolders: PropTypes.func.isRequired,
        loadRecursiveFolders: PropTypes.func.isRequired,
        filterFolders: PropTypes.func.isRequired,
        docsUnMount: PropTypes.func.isRequired,
        clearFilter: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        loadDocsMore: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        filterType: PropTypes.string.isRequired,
        checkAll: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
    };

    state = {
        scroll: null,
    };

    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            if(this.props.folder === folderType.folder) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id))
                    .then(() => this.props.loadFilterFolders(makeUrls.makeRootFoldersFolder())
                        .then(this.scrollStart))
                    .then(() => this.props.filterFolders(parseInt(this.props.params.id)))
                    .then(() => this.props.loadRecursiveFolders(makeUrls.makeFolderRecursive(this.props.params.id)));
            } else {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id)).then(this.scrollStart);
                this.props.filterFolders(parseInt(this.props.params.id));
            }
        }
        if (this.props.folder === folderType.root) {
            this.props.loadDocs(urls.docs.unsortedDocsUrl)
                .then(() => this.props.loadFilterFolders(makeUrls.makeRootFoldersFolder())
                    .then(this.scrollStart))
                .then(() => this.props.filterFolders(null));
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(nextProps.params.id));
                this.props.filterFolders(parseInt(nextProps.params.id));
                this.props.loadRecursiveFolders(makeUrls.makeFolderRecursive(nextProps.params.id));
                if (this.props.checkList.length) {
                    this.props.checkAll();
                }
                this.props.clearFilter(apps.docs);
            } else if (this.props.filterType !== nextProps.filterType || this.props.filter !== nextProps.filter) {
                this.props.loadDocs(makeUrls.makeFilterDocs(nextProps.params.id, nextProps.filter, nextProps.filterType));
            }
        }
        if (this.props.filterType !== nextProps.filterType || this.props.filter !== nextProps.filter) {
            if (this.props.folder === folderType.root) {
                this.props.loadDocs(makeUrls.makeFilterRootDocs(nextProps.filter, nextProps.filterType))
                    .then(() => this.props.filterFolders(null));
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (!this.props.params.hasOwnProperty('id') && prevProps.params.hasOwnProperty('id')) {
            this.props.docsUnMount();
            this.scrollStart();
        }
        if (this.props.params.hasOwnProperty('id') && !prevProps.params.hasOwnProperty('id')) {
            this.scrollStart();
        }
    }

    componentWillUnmount() {
        this.props.docsUnMount();
    }

    handleLoadMore = (e) => {
        if (this.props.folder === folderType.root) {
            this.props.loadDocsMore(makeUrls.makeDocsRootMore(this.props.page, this.props.filterType, this.props.filter));
        } else {
            this.props.loadDocsMore(makeUrls.makeDocsMore(this.props.params.id, this.props.page, this.props.filterType, this.props.filter));
        }
    };

    handleScroll = () => {
        if (!this.props.isLoadingMore && this.props.isLoading && this.props.count > (40 * (this.props.page - 1))) {
            const { scroll } = this.state;
            if (scroll.scrollHeight - scroll.scrollTop - scroll.offsetHeight < 10) {
                this.handleLoadMore();
            }
        }
    };

    scrollStart = () => {
        this.setState({ scroll: document.getElementsByClassName('content-flex')[0] });
    };

    renderView() {
        if (this.props.view === view.row) {
            return 'content-flex content-flex-row';
        }
        return 'content-flex content-flex-column';
    }
    render() {
        return (
            <div className="page-content-content-content">
                <DocsHeader params={ this.props.params } folder={ this.props.folder } />
                <div className={ this.renderView() } onScroll={ this.handleScroll }>
                    <FoldersTile isModal={ false } folder={ this.props.folder } />
                    <DocsTile folder={ this.props.folder } />
                </div>
            </div>
        );
    }
}

const mapStoreToProps = state => ({
    isLoading: state.document.isLoading,
    count: state.document.count,
    page: state.document.page,
    filter: state.page.filter.docs,
    filterType: state.page.filterSelect.docs,
    checkList: state.document.checkList,
    view: state.page.view,
    isLoadingMore: state.document.isLoadingMore,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        loadDocsMore,
        docsUnMount,
        loadFilterFolders,
        loadRecursiveFolders,
        modalOpen,
        setModal,
        checkAll,
        changeView,
        clearFilter,
        filterFolders,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent));
