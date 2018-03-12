import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modalType, items, makeUrls, folderType } from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';
import { loadDocs } from '../../actions/document';
import { setFilter, setSort } from '../../actions/page';
import Modal from '../Modal';
import DocsFilterHeader from "./DocsFilterHeader";

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isFoldersLoading: PropTypes.bool.isRequired,
        loadDocs: PropTypes.func.isRequired,
        setFilter: PropTypes.func.isRequired,
        setSort: PropTypes.func.isRequired,
        folder: PropTypes.string.isRequired,
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

    renderMenu() {
        let type = null;
        let title = null;
        if (this.props.folder === folderType.root) {
            type = 'root';
        } else {
            type = this.props.folders[parseInt(this.props.params.id)].type;
            title = (<React.Fragment>
                <img src={ items.back } className="item-left" onClick={ this.handleGoBack } />
                <div className="item-name">{this.props.folders[this.props.params.id].title}</div>
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
            return (<DocsFilterHeader setFilter={ this.props.setFilter } onFilter={ this.handleFilter } />);
        }
        if (this.props.checkList.length) {
            if (type === 'sorted' || type === 'folder') {
                return (<React.Fragment>
                    <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>
                    <button className="vk-button" onClick={ this.handleOpenReplace }>Переместить</button>
                    <button className="vk-button">Удалить</button>
                </React.Fragment>);
            }
            return <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>;
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
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
        loadDocs,
        setFilter,
        setSort,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsHeaderComponent));
