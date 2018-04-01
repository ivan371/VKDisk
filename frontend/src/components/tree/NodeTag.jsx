import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format, items } from '../../constants';
import Node from './Node';
import Tags from '../tag/Tags';
import {tagOpen} from "../../actions/tag";

class NodeTagComponent extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        tagOpen: PropTypes.func.isRequired,
    };

    handleOpen = () => {
        this.props.tagOpen();
    };

    renderImage() {
        if (this.props.isOpen) {
            return items.arrow;
        }
        return items.arrowRight;
    }

    renderTags() {
        return this.props.isOpen ? <Tags /> : null;
    }

    render() {
        return (
            <React.Fragment>
                <div className="content-item page-content-link-item" onClick={ this.handleOpen }>
                    <div><img className="item" src={ this.renderImage() } /></div>
                    <div>Tags</div>
                </div>
                <div className="node-layout">
                    { this.renderTags() }
                </div>
            </React.Fragment>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isOpen: state.tag.isOpen,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        tagOpen,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(NodeTagComponent);
