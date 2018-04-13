import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modalType, items, folderType, apps, view } from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';
import { checkAll, loadDocs, renameDoc } from '../../actions/document';
import {changeSortDirection, changeView, clearFilter, setFilter, setSort} from '../../actions/page';
import Modal from '../Modal';
import DocsFilterHeader from './DocsFilterHeader';
import DocsCheckHeader from './DocsCheckHeader';
import DocsDateHeader from './DocsDateHeader';
import { checkAllFolders, renameFolder } from '../../actions/folder';
import DocsSortHeader from './DocsSortHeader';

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isFoldersLoading: PropTypes.bool.isRequired,
        setFilter: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        countCheck: PropTypes.number.isRequired,
        countCheckFolder: PropTypes.number.isRequired,
        checkAll: PropTypes.func.isRequired,
        checkAllFolders: PropTypes.func.isRequired,
        changeView: PropTypes.func.isRequired,
        clearFilter: PropTypes.func.isRequired,
        view: PropTypes.string.isRequired,
        renameDoc: PropTypes.func.isRequired,
        renameFolder: PropTypes.func.isRequired,
        setSort: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        changeSortDirection: PropTypes.func.isRequired,
    };

    state = {
        isSort: false,
        isFilter: false,
        isDate: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.setState({ isFilter: false, isDate: false });
            }
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSort = () => {
        this.setState({ isSort: !this.state.isSort });
    };

    handleFilter = () => {
        this.setState({ isFilter: !this.state.isFilter }, () => {
            if (!this.state.isFilter) {
                this.props.clearFilter(apps.docs);
            }
        });
    };

    handleDate = () => {
        this.setState({ isDate: !this.state.isDate }, () => {
            if (!this.state.isDate) {
                this.props.clearFilter(apps.docs);
            }
        });
    };

    handleOpenCopy = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };

    handleOpenReplace = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderReplace);
    };


    handleGoBack = (e) => {
        this.props.history.goBack(e);
    };

    handleChangeView = () => {
        this.props.changeView();
    };

    renderMenu() {
        let type = null;
        let title = null;
        if (this.props.folder === folderType.root) {
            type = 'root';
            title = (<React.Fragment>
                <div className="item-name">You have {this.props.count} files</div>
            </React.Fragment>);
        } else {
            type = this.props.folders[parseInt(this.props.params.id)].type;
            title = (<React.Fragment>
                <img src={ items.back } className="item-left" onClick={ this.handleGoBack } />
                <div className="item-name">{this.props.folders[this.props.params.id].title} ({this.props.count} files)</div>
            </React.Fragment>);
        }
        if (this.state.isSort) {
            return (<DocsSortHeader
                setSort={this.props.setSort}
                sort={this.props.sort}
                clearSort={this.handleSort}
                sortDirect={this.props.sortDirect}
                changeSortDirection={this.props.changeSortDirection}
            />);
        }
        if (this.state.isFilter) {
            return (<DocsFilterHeader
                setFilter={ this.props.setFilter }
                onFilter={ this.handleFilter }
                filter={ this.props.filter }
            />);
        }
        if (this.state.isDate) {
            return (<DocsDateHeader
                setFilter={ this.props.setFilter }
                onFilter={ this.handleDate }
                filter={ this.props.filter }
            />);
        }
        if (this.props.countCheck || this.props.countCheckFolder) {
            return (<DocsCheckHeader
                type={ type }
                setModal={ this.props.setModal }
                modalOpen={ this.props.modalOpen }
                countCheckFile={ this.props.countCheck }
                countCheckFolder={ this.props.countCheckFolder }
                checkAllFiles={ this.props.checkAll }
                checkAllFolders={ this.props.checkAllFolders }
                renameDoc={ this.props.renameDoc }
                renameFolder={ this.props.renameFolder }
            />);
        }

        return (<React.Fragment>
            { title }
            <img className="item-right" src={ this.props.view === view.row ? items.colRow : items.colTable } onClick={ this.handleChangeView } />
            {type === 'sorted' || type === 'folder' || type === 'root' ?
                <AddFolder id={ parseInt(this.props.params.id) } folder={ this.props.folder } />
                : null}
            <img className="item-right" onClick={ this.handleSort } src={ items.sort } />
            <img className="item-right" onClick={ this.handleDate } src={ items.calendar } />
            <img className="item-right" onClick={ this.handleFilter } src={ items.filter } />
        </React.Fragment>);
    }

    render() {
        let folderHeader = null;
        let modal = null;
        if (this.props.isOpen) {
            modal = <Modal />;
        }
        if (this.props.isFoldersLoading
            && ((this.props.params.hasOwnProperty('id')) || this.props.folder === folderType.root)) {
            folderHeader = (<React.Fragment>
                {this.renderMenu()}
            </React.Fragment>);
        }
        return (<div className="content-item">
            {modal}
            {folderHeader}
        </div>);
    }
}

const mapStoreToProps = state => ({
    isFoldersLoading: state.folder.isLoading,
    isLoading: state.document.isLoading,
    folders: state.folder.folders,
    checkList: state.document.checkList,
    count: state.document.count,
    page: state.document.page,
    filterSelect: state.page.filterSelect.docs,
    filter: state.page.filter.docs,
    sort: state.page.sort.docs.name,
    sortDirect: state.page.sort.docs.isDirect,
    countCheck: state.document.countCheck,
    countCheckFolder: state.folder.countCheck,
    isOpen: state.modal.isOpen,
    view: state.page.view,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
        loadDocs,
        setFilter,
        setSort,
        checkAll,
        checkAllFolders,
        changeView,
        clearFilter,
        renameDoc,
        renameFolder,
        changeSortDirection,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsHeaderComponent));
