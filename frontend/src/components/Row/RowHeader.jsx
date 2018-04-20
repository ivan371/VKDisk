import React from 'react';
import PropTypes from 'prop-types';
import {apps, dragSource, folderType, items, makeUrls, modalType, sort} from '../../constants';
import {language} from '../language';

export default class RowHeaderComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        allowDrag: PropTypes.bool.isRequired,
        dropOver: PropTypes.func.isRequired,
        deleteDocs: PropTypes.func.isRequired,
        deleteFolders: PropTypes.func.isRequired,
        source: PropTypes.string,
        id: PropTypes.number,
        root: PropTypes.number,
        lang: PropTypes.string.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        countDocs: PropTypes.number.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        changeSortDirection: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: this.props.filterSelect,
        isSort: false,
    };

    handleOpenDelete = () => {
        if (this.props.countDocs) {
            this.props.modalOpen();
            this.props.setModal(modalType.documentDelete);
        }
    };

    handleSortOpen = () => {
        this.setState({isSort: !this.state.isSort})
    };

    handleDragOver = (e) => {
        if ((this.props.source === dragSource.file || this.props.source === dragSource.folder) && this.props.allowDrag) {
            e.preventDefault();
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleDrop = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
            this.props.deleteDocs(makeUrls.makeCustomFile(this.props.id), this.props.id);
            this.props.dropOver();
        }
        if (this.props.source === dragSource.folder && this.props.allowDrag) {
            this.props.deleteFolders(makeUrls.makeCustomFolder(this.props.id), this.props.id, this.props.root);
            this.props.dropOver();
        }
    };

    handleFilter = (e) => {
        if (e.keyCode === 13) {
            this.props.setFilter(this.state.filter, this.state.filterSelect, apps.folder);
        }
    };

    handleSetSort = (e) => {
        if(this.props.sort === e.target.value) {
            this.props.changeSortDirection(apps.folder);
        }
        else {
            this.props.setSort(e.target.value, apps.folder);
        }
    };

    renderTrash() {
        if (this.props.source === dragSource.file || this.props.source === dragSource.folder) {
            if (this.props.allowDrag) {
                return items.trashGood;
            }
            return items.trashBad;
        }
        return items.trash;
    }

    renderSearch() {
        if(this.props.folder === folderType.chat) {
            return (<input
                className="content-item__input search"
                type="text"
                placeholder={language.search[this.props.lang]}
                name="filter"
                value={this.state.filter}
                onChange={this.handleChange}
                onKeyDown={this.handleFilter}
            />);
        } else {
            return <div className="item-name">{language.yourFolder[this.props.lang]}</div>;
        }
    }

    renderSortNameDirection() {
        if (!this.props.sortDirect && this.props.sort === sort.name) {
            return items.sortReverse
        }
        return items.sortDirect
    }

    renderSortDateDirection() {
        if (!this.props.sortDirect && this.props.sort === sort.date) {
            return items.sortReverse
        }
        return items.sortDirect
    }

    renderSort() {
        if (this.props.folder === folderType.chat) {
            return <img className="item-right" src={items.sort} onClick={this.handleSortOpen}/>
        }
        return null;
    }

    renderHeader() {
        if (this.state.isSort) {
            return (
                <div className="content-item">
                    <button className="vk-button button-secondary" onClick={ this.handleSortOpen }>{language.back[this.props.lang]}</button>
                    <button className={ `sort-button${this.props.sort === 'title' ? ' sort-button-selected' : ''}` } value="title" onClick={ this.handleSetSort }>Name</button>
                    <img className="item-left sort-row" src={this.renderSortNameDirection()} />
                    <button className={ `sort-button${this.props.sort === 'created' ? ' sort-button-selected' : ''}` } value="created" onClick={ this.handleSetSort }>Date</button>
                    <img className="item-left sort-row" src={this.renderSortDateDirection()} />
                </div>
            );
        }
        return (
            <div className="content-item">
                {this.renderSearch()}
                <img className="item-right"
                     src={ this.renderTrash() }
                     onDragOver={ this.handleDragOver }
                     onDrop={ this.handleDrop }
                     onClick={ this.handleOpenDelete }
                />
                {this.renderSort()}
            </div>
        )
    }

    render () {
        return (this.renderHeader())
    }
}