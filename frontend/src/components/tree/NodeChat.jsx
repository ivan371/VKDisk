import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format, items } from '../../constants';
import Node from './Node';

class NodeChatComponent extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        folder: PropTypes.string.isRequired,
    };

    renderImage() {
        if (this.props.folder === folderType.chat) {
            return items.arrow;
        }
        return items.arrowRight;
    }

    render() {
        let nodeList = [];
        if (this.props.isLoading && this.props.folder === folderType.chat) {
            nodeList = this.props.folderList.map(nodeId => (<Node
                id={ nodeId }
                key={ nodeId }
                folders={ this.props.folders }
                title={ this.props.folders[nodeId].title }
                folder={ this.props.folder }
            />));
        }
        const link = '/chat';
        return (
            <React.Fragment>
                <Link to={ link }>
                    <div className="content-item page-content-link-item">
                        <div><img className="item" src={ this.renderImage() } /></div>
                        <div>Dialogs</div>
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
    isLoading: state.folder.isLoading,
    folderList: state.folder.folderUnTreeList,
    folders: state.folder.folders,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(NodeChatComponent);
