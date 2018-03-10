import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { folderType, makeUrls, urls } from '../../constants';
import { checkAll, docsUnMount, loadDocs, loadDocsMore } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import { modalOpen, setModal } from '../../actions/modal';
import FoldersTile from '../tile/FoldersTile';
import DocsTile from '../tile/DocsTile';
import DocsHeader from './DocsHeader';

class DocsComponent extends React.Component {
    static propTypes = {
        loadDocs: PropTypes.func.isRequired,
        loadFilterFolders: PropTypes.func.isRequired,
        docsUnMount: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        loadDocsMore: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        filterType: PropTypes.string.isRequired,
        checkAll: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
    };

    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id));
            this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(this.props.params.id));
        }
        if (this.props.folder === folderType.root) {
            this.props.loadDocs(urls.docs.unsortedDocsUrl);
            this.props.loadFilterFolders(makeUrls.makeRootFoldersFolder());
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(nextProps.params.id));
                this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(nextProps.params.id));
                if (this.props.checkList.length) {
                    this.props.checkAll();
                }
            } else if (this.props.filterType !== nextProps.filterType || this.props.filter !== nextProps.filter) {
                this.props.loadDocs(makeUrls.makeFilterDocs(nextProps.params.id, nextProps.filter, nextProps.filterType));
            }
        }
        if (this.props.filterType !== nextProps.filterType || this.props.filter !== nextProps.filter) {
            if (this.props.folder === folderType.root) {
                this.props.loadDocs(makeUrls.makeFilterRootDocs(nextProps.filter, nextProps.filterType));
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (!this.props.params.hasOwnProperty('id') && prevProps.params.hasOwnProperty('id')) {
            this.props.docsUnMount();
        }
    }

    componentWillUnmount() {
        this.props.docsUnMount();
    }

    handleLoadMore = (e) => {
        if (this.props.folder === folderType.root) {
            this.props.loadDocsMore(makeUrls.makeDocsRootMore(this.props.page, this.props.filter, this.props.filterType));
        } else {
            this.props.loadDocsMore(makeUrls.makeDocsMore(this.props.params.id, this.props.page, this.props.filter, this.props.filterType));
        }
    };
    render() {
        return (
            <div className="page-content-content-content">
                <DocsHeader params={ this.props.params } folder={ this.props.folder } />
                <div className="content-flex">
                    <FoldersTile isModal={ false } />
                    <DocsTile />
                    { this.props.isLoading && this.props.count > (10 * (this.props.page - 1)) ? <div>
                        <button onClick={ this.handleLoadMore }>Показать еще</button>
                    </div> : null }
                </div>
            </div>
        );
    }
}

const mapStoreToProps = state => ({
    isLoading: state.document.isLoading,
    count: state.document.count,
    page: state.document.page,
    filter: state.page.filter,
    filterType: state.page.filterSelect,
    checkList: state.document.checkList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        loadDocsMore,
        docsUnMount,
        loadFilterFolders,
        modalOpen,
        setModal,
        checkAll,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent));
