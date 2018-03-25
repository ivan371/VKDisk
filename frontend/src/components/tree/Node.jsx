import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format } from '../../constants';

export default class NodeComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        folder: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        nodeList: PropTypes.array,
        folders: PropTypes.object,
    };

    render() {
        let link = null;
        switch (this.props.folder) {
            case folderType.root:
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
                nodeList={ this.props.folders[nodeId].hasOwnProperty('folder_set') ? this.props.folders[nodeId].folder_set : [] }
            />));
        }
        return (
            <React.Fragment>
                <Link to={ link }>
                    <div className="content-item page-content-link-item">
                        <div><img className="item" src={ format.folder } /></div>
                        <div>{this.props.title}</div>
                    </div>
                </Link>
                <div className="node-layout">
                    {nodeList}
                </div>
            </React.Fragment>
        );
    }
}

