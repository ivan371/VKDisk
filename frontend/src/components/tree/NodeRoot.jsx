import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format, items } from '../../constants';
import Node from './Node';

class NodeRootComponent extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        folder: PropTypes.string.isRequired,
    };

    renderImage() {
        if (this.props.folder === folderType.root || this.props.folder === folderType.folder) {
            return items.arrow;
        }
        return format.folder;
    }

    render() {
        const link = '/root';
        let nodeList = [];
        if (this.props.isLoading &&
            (this.props.folder === folderType.root)) {
            nodeList = this.props.folderList.map(nodeId => (<Node
                id={ nodeId }
                key={ nodeId }
                folder={ this.props.folder }
            />));
        }
        return (
            <React.Fragment>
                <Link to={ link }>
                    <div className="content-item page-content-link-item">
                        <div><img className="item" src={ this.renderImage() } /></div>
                        <div>All items</div>
                    </div>
                </Link>
                <div className="node-layout">
                    {nodeList}
                </div>
            </React.Fragment>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.folder.isTileLoading,
    folderList: state.folder.folderTileList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(NodeRootComponent);
