import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/page';
import { apps, tagType } from '../../constants';
import {tagSelect} from '../../actions/tag';

export class TagComponent extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        filterName: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        tagSelect: PropTypes.func.isRequired,
        tag: PropTypes.string,
    };

    handleFilter = () => {
        if (this.props.type === tagType.filter) {
            this.props.setFilter(this.props.value, this.props.filterName, apps.docs);
            this.props.tagSelect(this.props.name);
        }
    };

    renderClassName () {
        if (this.props.tag === this.props.name) {
            return "vk-button tag-button";
        }
        return "vk-button button-secondary tag-button"
    }

    render() {
        return <button onClick={ this.handleFilter } className={this.renderClassName()}>{this.props.name}</button>;
    }
}

const mapStoreToProps = (state, props) => ({
    isOpen: state.tag.isOpen,
    tag: state.tag.selected,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setFilter,
        tagSelect,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TagComponent);

