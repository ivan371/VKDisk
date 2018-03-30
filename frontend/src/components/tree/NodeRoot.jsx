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
        folderList: PropTypes.array,
        foldersRecursiveList: PropTypes.array,
    };

    renderImage() {
        if (this.props.folder === folderType.root || this.props.folder === folderType.folder) {
            return items.arrow;
        }
        return items.arrowRight;
    }

    render() {
        const link = '/root';
        let nodeList = [];
        if (this.props.isLoading &&
            (this.props.folder !== folderType.chat)) {
            nodeList = this.props.folderList.map(nodeId => (<Node
                id={ nodeId }
                key={ nodeId }
                folder={ this.props.folder }
                folders={ this.props.folders }
                title={ this.props.folders[nodeId].title }
                foldersRecursiveList={ this.props.foldersRecursiveList }
                nodeList={ this.props.folders[nodeId].hasOwnProperty('folder_set')
                && this.props.foldersRecursiveList.indexOf(nodeId) !== -1
                    ? this.props.folders[nodeId].folder_set : [] }
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
    folders: state.folder.folders,
    foldersRecursiveList: state.folder.foldersRecursiveList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(NodeRootComponent);
