import React from 'react';
import PropTypes from 'prop-types';
import {apps, dragSource, folderType, items, makeUrls} from '../../constants';

export default class RowHeaderComponent extends React.Component {
    static propTypes = {
        folder: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        allowDrag: PropTypes.bool.isRequired,
        dropOver: PropTypes.func.isRequired,
        deleteDocs: PropTypes.func.isRequired,
        source: PropTypes.string,
        id: PropTypes.number,
    };

    state = {
        filter: this.props.filter,
        filterSelect: this.props.filterSelect,
        isSort: false,
    };

    handleSortOpen = () => {
        this.setState({isSort: !this.state.isSort})
    };

    handleDragOver = (e) => {
        if (this.props.source === dragSource.file && this.props.allowDrag) {
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
    };

    handleFilter = (e) => {
        if (e.keyCode === 13) {
            this.props.setFilter(this.state.filter, this.state.filterSelect, apps.folder);
        }
    };

    handleSetSort = (e) => {
        this.props.setSort(e.target.value, apps.folder);
    };

    renderTrash() {
        if (this.props.source === dragSource.file) {
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
                placeholder="Search"
                name="filter"
                value={this.state.filter}
                onChange={this.handleChange}
                onKeyDown={this.handleFilter}
            />);
        } else {
            return <div className="item-name">Your folders</div>;
        }
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
                    <button className="vk-button button-secondary" onClick={ this.handleSortOpen }>Cancel</button>
                    <button className={ `sort-button${this.props.sort === 'name' ? ' sort-button-selected' : ''}` } value="name" onClick={ this.handleSetSort }>Name</button>
                    <button className={ `sort-button${this.props.sort === 'date' ? ' sort-button-selected' : ''}` } value="date" onClick={ this.handleSetSort }>Date</button>
                </div>
            );
        }
        return (
            <div className="content-item">
                {this.renderSearch()}
                <img className="item-right" src={ this.renderTrash() } onDragOver={ this.handleDragOver } onDrop={ this.handleDrop } />
                {this.renderSort()}
            </div>
        )
    }

    render () {
        return (this.renderHeader())
    }
}