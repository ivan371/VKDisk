import React from 'react';
import { folderType } from '../../constants';
import CustomRow from '../Row/CustomRow';

class RootFolderComponent extends React.Component {
    render() {
        let folder = null;
        if (this.props.match.params.hasOwnProperty("id")) {
            folder = folderType.folder;
        } else {
            folder = folderType.root;
        }
        return (
            <CustomRow folder={ folder } params={ this.props.match.params } history={ this.props.history } />
        );
    }
}

export default RootFolderComponent;
