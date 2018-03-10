import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tileType } from '../../constants';
import Tile from '../tile/Tile';

class FoldersTileComponent extends React.Component {
    static propTypes = {
        folderList: PropTypes.array.isRequired,
        folderTransferList: PropTypes.array.isRequired,
        isTileLoading: PropTypes.bool.isRequired,
        isTransferLoading: PropTypes.bool.isRequired,
        isModal: PropTypes.bool.isRequired,
    };

    render() {
        let folderList = [];
        let list = null;
        let loading = null;
        if (!this.props.isModal) {
            list = this.props.folderList;
            loading = this.props.isTileLoading;
        } else {
            list = this.props.folderTransferList;
            loading = this.props.isTransferLoading;
        }
        if (loading) {
            folderList = list.map(folderId => (<Tile
                history={ this.props.history }
                url={ `/folder/${folderId}` }
                title={ this.props.folders[folderId].title }
                key={ folderId }
                id={ folderId }
                type={ tileType.folder }
                isModal={ this.props.isModal }
            />));
        }
        return (<React.Fragment>{folderList}</React.Fragment>);
    }
}

const mapStoreToProps = (state, props) => ({
    folderList: state.folder.folderTileList,
    folderTransferList: state.folder.folderTransferList,
    folders: state.folder.folders,
    isTileLoading: state.folder.isTileLoading,
    isTransferLoading: state.folder.isTransferLoading,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(FoldersTileComponent);
