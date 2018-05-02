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
        root: PropTypes.number,
        lang: PropTypes.string.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        changeSortDirection: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: this.props.filterSelect,
        isSort: false,
    };

    handleSortOpen = () => {
        this.setState({isSort: !this.state.isSort})
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
                {this.renderSort()}
            </div>
        )
    }

    render () {
        return (this.renderHeader())
    }
}