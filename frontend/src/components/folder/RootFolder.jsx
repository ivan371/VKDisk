import React from 'react';
import { folderType } from '../../constants';
import CustomRow from '../Row/CustomRow';

class RootFolderComponent extends React.Component {
    render() {
        return (
            <CustomRow folder={ folderType.root } params={ this.props.match.params } history={ this.props.history } />
        );
    }
}

export default RootFolderComponent;
