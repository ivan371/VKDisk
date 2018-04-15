import React from 'react';
import PropTypes from 'prop-types';
import { modalType, items, makeUrls, folderType, apps } from '../../constants';

export default class DocsFilterHeader extends React.Component {
    static propTypes = {
        setFilter: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        filter: PropTypes.string.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: 'name',
    };

    handleFilterStart = (e) => {
        this.props.setFilter(this.state.filter, this.state.filterSelect, apps.docs);
    };

    handleFilterEnter = (e) => {
        if (e.keyCode === 13) {
            this.props.setFilter(this.state.filter, this.state.filterSelect, apps.docs);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (<React.Fragment>
            <img className="item-left" onClick={ this.handleFilter } src={ items.filter } />
            <button className="vk-button button-secondary" onClick={ this.props.onFilter }>Cancel</button>
            <button className="vk-button" onClick={ this.handleFilterStart }>Search</button>
            <input
                className="content-item__input search"
                type="list"
                list="extension-list"
                placeholder="Search"
                onChange={ this.handleChange }
                onKeyDown={ this.handleFilterEnter }
                name="filter"
                value={ this.state.filter }
            /><datalist id="extension-list">
                <option value="pdf" />
                <option value="doc" />
                <option value="xls" />
                <option value="docx" />
                <option value="zip" />
                <option value="djvu" />
                <option value="xlsx" />
                <option value="gif" />
                <option value="png" />
                <option value="jpg" />
                <option value="gz" />
                <option value="txt" />
                <option value="tex" />
                <option value="py" />
            </datalist>
        </React.Fragment>);
    }
}
