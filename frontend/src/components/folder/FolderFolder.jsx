import React from 'react';
import { folderType } from '../../constants';
import CustomRow from '../Row/CustomRow';

class FolderFolderComponent extends React.Component {
    render() {
        return (
            <CustomRow folder={ folderType.folder } params={ this.props.match.params } history={ this.props.history } />
        );
    }
}

export default FolderFolderComponent;
