import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {modalType, items, makeUrls} from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';
import {loadDocs} from "../../actions/document";

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isFoldersLoading: PropTypes.bool.isRequired,
        loadDocs: PropTypes.func.isRequired,
    };

    state = {
        isSort: false,
        isFilter: false,
        filter: '',
        filterSelect: 'name',
    };

    handleFilterStart = (e) => {
        this.props.loadDocs(makeUrls.makeFilterDocs(this.props.params.id, this.state.filterSelect, this.state.filter));
    };

    handleSelectFilter = (e) => {
        this.setState({ filterSelect: e.target.value });
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
        const type = this.props.folders[parseInt(this.props.params.id)].type;
        if (this.state.isSort) {
            return (<React.Fragment>
                <button className="vk-button" onClick={ this.handleSort }>Cancel</button>
                <button className="vk-button">Sort</button>
                <select className="vk-button">
                    <option>Name</option>
                    <option>Date</option>
                </select>
            </React.Fragment>);
        }
        if (this.state.isFilter) {
            return (<React.Fragment>
                <img className="item-left" onClick={ this.handleFilter } src={ items.filter } />
                <button className="vk-button" onClick={ this.handleFilter }>Cancel</button>
                <button className="vk-button" onClick={ this.handleFilterStart }>Search</button>
                <select className="vk-button" onChange={ this.handleSelectFilter } >
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                    <option value="extension">Extension</option>
                </select>
                <input className="content-item__input" type="text" placeholder="Search" onChange={ this.handleChange } name="filter" />
            </React.Fragment>);
        }
        if (this.props.checkList.length) {
            if (type === 'sorted' || type === 'foldet') {
                return (<React.Fragment>
                    <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>
                    <button className="vk-button" onClick={ this.handleOpenReplace }>Переместить</button>
                    <button className="vk-button">Удалить</button>
                </React.Fragment>);
            }
            return <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>;
        }

        return (<React.Fragment>
            <img src={ items.back } className="item-left" onClick={ this.handleGoBack } />
            <div className="item-name">{this.props.folders[this.props.params.id].title}</div>
            {type === 'sorted' || type === 'folder' ? <AddFolder id={ parseInt(this.props.params.id) } /> : null}
            <img className="item-right" onClick={ this.handleSort } src={ items.sort } />
            <img className="item-right" onClick={ this.handleFilter } src={ items.filter } />
        </React.Fragment>);
    }

    render() {
        let folderHeader = null;
        if (this.props.isLoading && this.props.isFoldersLoading && this.props.params.hasOwnProperty('id')) {
            folderHeader = (<React.Fragment>
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
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
        loadDocs,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsHeaderComponent));
