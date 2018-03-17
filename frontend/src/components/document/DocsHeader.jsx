import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modalType, items, folderType } from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';
import { checkAll, loadDocs } from '../../actions/document';
import { setFilter, setSort } from '../../actions/page';
import Modal from '../Modal';
import DocsFilterHeader from './DocsFilterHeader';
import DocsCheckHeader from './DocsCheckHeader';

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        setFilter: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        countCheck: PropTypes.number.isRequired,
        checkAll: PropTypes.func.isRequired,
    };

    state = {
        isSort: false,
        isFilter: false,
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSort = () => {
        this.setState({ isSort: !this.state.isSort });
    };

    handleFilter = () => {
        this.setState({ isFilter: !this.state.isFilter });
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

    handleClearAll = () => {
        this.props.checkAll();
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
            return (<React.Fragment>
                <button className="vk-button button-secondary" onClick={ this.handleSort }>Cancel</button>
                <button className="vk-button">Sort</button>
                <select className="vk-button">
                    <option>Name</option>
                    <option>Date</option>
                </select>
            </React.Fragment>);
        }
        if (this.state.isFilter) {
            return (<DocsFilterHeader
                setFilter={ this.props.setFilter }
                onFilter={ this.handleFilter }
                filter={ this.props.filter }
                filterSelect={ this.props.filterSelect }
            />);
        }
        if (this.props.countCheck) {
            return (<DocsCheckHeader
                type={ type }
                setModal={ this.props.setModal }
                modalOpen={ this.props.modalOpen }
                countCheck={ this.props.countCheck }
                checkAll={ this.props.checkAll }
            />);
        }

        return (<React.Fragment>
            { title }
            {type === 'sorted' || type === 'folder' || type === 'root' ?
                <AddFolder id={ parseInt(this.props.params.id) } folder={ this.props.folder } />
                : null}
            <img className="item-right" onClick={ this.handleSort } src={ items.sort } />
            <img className="item-right" onClick={ this.handleFilter } src={ items.filter } />
        </React.Fragment>);
    }

    render() {
        let folderHeader = null;
        let modal = null;
        if (this.props.isOpen) {
            modal = <Modal />;
        }
        if (this.props.isLoading
            && ((this.props.params.hasOwnProperty('id')) || this.props.folder === folderType.root)) {
            folderHeader = (<React.Fragment>
                { modal }
                {this.renderMenu()}
            </React.Fragment>);
        }
        return (<div className="content-item">
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
    isOpen: state.modal.isOpen,
    filterSelect: state.page.filterSelect.docs,
    filter: state.page.filter.docs,
    countCheck: state.document.countCheck,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
        loadDocs,
        setFilter,
        setSort,
        checkAll,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsHeaderComponent));
