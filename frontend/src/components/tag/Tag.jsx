import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/page';
import { apps, tagType } from '../../constants';

export class TagComponent extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        filterName: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
    };

    handleFilter = () => {
        if (this.props.type === tagType.filter) {
            this.props.setFilter(this.props.value, this.props.filterName, apps.docs);
        }
    };

    render() {
        return <button onClick={ this.handleFilter } className="vk-button button-secondary tag-button">{this.props.name}</button>;
    }
}

const mapStoreToProps = (state, props) => ({
    isOpen: state.tag.isOpen,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setFilter,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TagComponent);

