import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {modalType, items, makeUrls, folderType, apps} from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';
import { loadDocs } from '../../actions/document';
import { setFilter, setSort } from '../../actions/page';
import Modal from '../Modal';

export default class DocsFilterHeader extends React.Component {
    static propTypes = {
        setFilter: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        filter: PropTypes.string.isRequired,
        filterSelect: PropTypes.string.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: this.props.filterSelect,
        isDate: false,
        isExt: false,
    };

    handleFilterStart = (e) => {
        this.props.setFilter(this.state.filter, this.state.filterSelect, apps.docs);
    };

    handleSelectFilter = (e) => {
        if (e.target.value === 'date') {
            this.setState({ isDate: true, isExt: false, filterSelect: e.target.value });
        } else if (e.target.value === 'extension') {
            this.setState({ isDate: false, isExt: true, filterSelect: e.target.value });
        } else {
            this.setState({ isDate: false, isExt: false, filterSelect: e.target.value });
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        let input = null;
        if (this.state.isDate) {
            input = (<input
                className="content-item__input"
                type="date"
                onChange={ this.handleChange }
                name="filter"
                value={ this.state.filter }
            />);
        } else if (this.state.isExt) {
            input = (<React.Fragment><input
                className="content-item__input"
                type="list"
                list="extension-list"
                placeholder="Search"
                onChange={ this.handleChange }
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
        } else {
            input = (<input
                className="content-item__input"
                type="text"
                placeholder="Search"
                onChange={ this.handleChange }
                name="filter"
                value={ this.state.filter }
            />);
        }

        return (<React.Fragment>
            <img className="item-left" onClick={ this.handleFilter } src={ items.filter } />
            <button className="vk-button button-secondary" onClick={ this.props.onFilter }>Cancel</button>
            <button className="vk-button" onClick={ this.handleFilterStart }>Search</button>
            <select className="vk-button" onChange={ this.handleSelectFilter } value={ this.state.filterSelect }>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="extension">Extension</option>
            </select>
            {input}
        </React.Fragment>);
    }
}
