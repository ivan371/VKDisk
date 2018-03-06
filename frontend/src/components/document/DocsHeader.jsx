import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modalType, items } from '../../constants';
import { docsUnMount, loadDocs, loadDocsMore } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isFolderLoading: PropTypes.bool.isRequired,
    };

    handleOpen = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };

    handleGoBack = (e) => {
        this.props.history.goBack(e);
    };

    render() {
        let folderHeader = null;
        let type = null;
        if (this.props.isLoading && this.props.isFolderLoading && this.props.params.hasOwnProperty('id')) {
            type = this.props.folders[parseInt(this.props.params.id)].type;
            if (this.props.params.hasOwnProperty('id')) {
                folderHeader = (<React.Fragment>
                    <img src={ items.back } className="item-left" onClick={ this.handleGoBack } />
                    <div className="item-name">{this.props.folders[this.props.params.id].title}</div>
                    {type === 'sorted' ? <AddFolder id={ parseInt(this.props.params.id) } /> : null}
                    <button className="vk-button" onClick={ this.handleOpen }>Копировать</button>
                    {type === 'sorted' ? <button className="vk-button" onClick={ this.handleOpen }>Переместить</button> : null}
                </React.Fragment>);
            }
        }
        return (<div className="content-item">
            {folderHeader}
        </div>);
    }
}

const mapStoreToProps = state => ({
    isFolderLoading: state.folder.isLoading,
    isLoading: state.document.isLoading,
    folders: state.folder.folders,
    count: state.document.count,
    page: state.document.page,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        setModal,
    }, dispatch),
});

export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsHeaderComponent));
