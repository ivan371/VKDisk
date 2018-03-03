import React from 'react';
import { folderType } from '../../constants';
import CustomRow from '../Row/CustomRow';

class ChatFolderComponent extends React.Component {
    render() {
        return (
            <CustomRow folder={ folderType.chat } params={ this.props.match.params } history={ this.props.history } />
        );
    }
}

export default ChatFolderComponent;
