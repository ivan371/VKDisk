import React from 'react';
import PropTypes from 'prop-types';
import { modalType, items, makeUrls, folderType, apps, sort } from '../../constants';

export default class DocsSortHeader extends React.Component {
    static propTypes = {
        setSort: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired,
        clearSort: PropTypes.func.isRequired,
        sortDirect: PropTypes.bool.isRequired,
        changeSortDirection: PropTypes.func.isRequired,
    };

    handleSetSort = (e) => {
        if(this.props.sort === e.target.value) {
            this.props.changeSortDirection(apps.docs);
        }
        else {
            this.props.setSort(e.target.value, apps.docs);
        }
    };

    handleSort = () => {
        this.props.clearSort()
    };

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

    render() {
        return (<React.Fragment>
            <button className="vk-button button-secondary" onClick={ this.handleSort }>Cancel</button>
            <button className={ `sort-button${this.props.sort === sort.name ? ' sort-button-selected' : ''}` } value={sort.name} onClick={ this.handleSetSort }>Name</button>
            <img className="item-left" src={this.renderSortNameDirection()} />
            <button className={ `sort-button${this.props.sort === sort.date ? ' sort-button-selected' : ''}` } value={sort.date} onClick={ this.handleSetSort }>Date</button>
            <img className="item-left" src={this.renderSortDateDirection()} />
        </React.Fragment>)
    }
}
