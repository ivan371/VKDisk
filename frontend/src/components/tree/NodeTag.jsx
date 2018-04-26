import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {apps, folderType, format, items} from '../../constants';
import Node from './Node';
import Tags from '../tag/Tags';
import {tagOpen} from "../../actions/tag";
import {language} from '../language';
import {setFilter} from '../../actions/page';

class NodeTagComponent extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        tagOpen: PropTypes.func.isRequired,
        lang: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
    };

    handleOpen = () => {
        this.props.tagOpen();
    };

    handleClearTag = () => {
        this.props.setFilter('', 'created', apps.docs);
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
            <a>
                <div className="content-item page-content-link-item" onClick={ this.handleOpen }>
                    <div><img className="item" src={ this.renderImage() } /></div>
                    <div>{language.tags[this.props.lang]}</div>
                    {this.props.isOpen ? <div><img className="item cross-right" src={ items.clear } onClick={ this.handleClearTag }/></div> : null}
                </div>
                <div className="node-layout">
                    { this.renderTags() }
                </div>
            </a>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isOpen: state.tag.isOpen,
    lang: state.page.lang,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        tagOpen,
        setFilter
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(NodeTagComponent);
