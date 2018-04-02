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

export default class DocsDateHeader extends React.Component {
    static propTypes = {
        setFilter: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        filter: PropTypes.string.isRequired,
    };

    state = {
        filter: this.props.filter,
        filterSelect: 'date',
    };

    handleFilterStart = (e) => {
        this.props.setFilter(this.state.filter, this.state.filterSelect, apps.docs);
    };

    handleSelectFilter = (e) => {
        this.setState({ filterSelect: e.target.value });
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
                className="content-item__input calendar search"
                type="date"
                onChange={ this.handleChange }
                name="filter"
                value={ this.state.filter }
            />
        </React.Fragment>);
    }
}
