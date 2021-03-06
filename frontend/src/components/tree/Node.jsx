import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format, items } from '../../constants';

export default class NodeComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        folder: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        nodeList: PropTypes.array,
        folders: PropTypes.object,
        foldersRecursiveList: PropTypes.array,
    };

    renderImage() {
        if (this.props.folder === folderType.folder
            && this.props.foldersRecursiveList.indexOf(this.props.id) !== -1 && this.props.nodeList.length) {
            return items.arrow;
        }
        return items.arrowRight;
    }

    renderAvatar() {
        if (this.props.folder === folderType.chat) {
            if (this.props.icon)
                return <div><img className="item-avatar" src={this.props.icon }/></div>
            else
                return <div><img className="item-avatar" src={format.folder}/></div>
        }
        return null;
    }

    render() {
        let link = null;
        switch (this.props.folder) {
            case folderType.root:
                link = `/folder/${this.props.id}`;
                break;
            case folderType.folder:
                link = `/folder/${this.props.id}`;
                break;
            case folderType.chat:
                link = `/chat/${this.props.id}`;
                break;
            default:
        }
        let nodeList = [];
        if (this.props.folder !== folderType.chat && nodeList) {
            nodeList = this.props.nodeList.map(nodeId => (<NodeComponent
                id={ nodeId }
                key={ nodeId }
                folder={ this.props.folder }
                folders={ this.props.folders }
                title={ this.props.folders[nodeId].title }
                icon={ this.props.folders[nodeId].icon }
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
                        { this.renderAvatar() }
                        <div className="item-title">{this.props.title}</div>
                    </div>
                </Link>
                <div className="node-layout">
                    {nodeList}
                </div>
            </React.Fragment>
        );
    }
}

