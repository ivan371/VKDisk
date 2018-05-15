import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {apps, folderType, makeUrls, urls, view, makeElasticUrls, makeElastic} from '../../constants';
import { checkAll, docsUnMount, loadDocs, loadDocsMore } from '../../actions/document';
import { filterFolders, loadFilterFolders, loadRecursiveFolders, loadRoot } from '../../actions/folder';
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
        sort: PropTypes.string.isRequired,
        filterType: PropTypes.string.isRequired,
        checkAll: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
        loadRoot: PropTypes.func.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        isElastic: PropTypes.bool.isRequired,
    };

    state = {
        scroll: null,
    };

    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            if (this.props.folder === folderType.folder) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id))
                    .then(this.scrollStart)
                    .then(() => this.props.loadRecursiveFolders(makeUrls.makeFolderRecursive(this.props.params.id)));
            } else {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id)).then(this.scrollStart);
                this.props.filterFolders(parseInt(this.props.params.id));
            }
        }
        if (this.props.folder === folderType.root) {
            this.props.loadDocs(urls.docs.unsortedDocsUrl)
                .then(this.scrollStart)
                .then(() => this.props.loadRoot());
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.params.hasOwnProperty('id')) {
            if(this.props.folder !== nextProps.folder) {
                if (nextProps.folder === folderType.root) {
                    this.props.loadDocs(urls.docs.unsortedDocsUrl)
                        .then(this.scrollStart)
                        .then(() => this.props.loadRoot());
                }
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.params.hasOwnProperty('id')) {
            if(prevProps.sortDirect !== this.props.sortDirect
                || prevProps.sort !== this.props.sort
                || prevProps.filterType !== this.props.filterType
                || prevProps.filter !== this.props.filter
                || prevProps.isElastic !== this.props.isElastic
                || prevProps.params.id !== this.props.params.id
            ) {
                this.props.loadDocs(makeElastic.makeFolderElastic(
                    this.props.params.id,
                    this.props.filter,
                    this.props.filterType,
                    this.props.sort,
                    !this.props.sortDirect,
                    this.props.isElastic
                ));
                this.props.filterFolders(parseInt(this.props.params.id));
                this.props.loadRecursiveFolders(makeUrls.makeFolderRecursive(this.props.params.id))
            }
        }
        if (this.props.folder === folderType.root) {
            if(prevProps.sortDirect !== this.props.sortDirect
                || prevProps.sort !== this.props.sort
                || prevProps.filterType !== this.props.filterType
                || prevProps.filter !== this.props.filter
                || prevProps.isElastic !== this.props.isElastic
            ) {
                this.props.loadDocs(makeElastic.makeRootElastic(
                    this.props.filter,
                    this.props.filterType,
                    this.props.sort,
                    !this.props.sortDirect,
                    this.props.isElastic
                ));
            }
        }
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
            this.props.loadDocsMore(makeElastic.makeRootElasticMore(
                this.props.filter,
                this.props.filterType,
                this.props.sort,
                !this.props.sortDirect,
                this.props.isElastic,
                this.props.page
            ));
        } else {
            this.props.loadDocsMore(makeElastic.makeFolderElasticMore(
                this.props.params.id,
                this.props.filter,
                this.props.filterType,
                this.props.sort,
                !this.props.sortDirect,
                this.props.isElastic,
                this.props.page
            ));
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
    sort: state.page.sort.docs.name,
    sortDirect: state.page.sort.docs.isDirect,
    checkList: state.document.checkList,
    view: state.page.view,
    isLoadingMore: state.document.isLoadingMore,
    isElastic: state.page.isElastic,
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
        loadRoot,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent));
