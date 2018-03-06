import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modalType, items } from '../../constants';
import AddFolder from '../folder/AddFolder';
import { modalOpen, setModal } from '../../actions/modal';

class DocsHeaderComponent extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isFoldersLoading: PropTypes.bool.isRequired,
    };

    handleOpenCopy = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };

    handleOpenReplace = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderReplace);
    };

    handleGoBack = (e) => {
        this.props.history.goBack(e);
    };

    render() {
        let folderHeader = null;
        let type = null;
        if (this.props.isLoading && this.props.isFoldersLoading && this.props.params.hasOwnProperty('id')) {
            type = this.props.folders[parseInt(this.props.params.id)].type;
            folderHeader = (<React.Fragment>
                <img src={ items.back } className="item-left" onClick={ this.handleGoBack } />
                <div className="item-name">{this.props.folders[this.props.params.id].title}</div>
                {type === 'sorted' || type === 'folder' ? <AddFolder id={ parseInt(this.props.params.id) } /> : null}
                <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>
                {type === 'sorted' || type === 'folder' ? <button className="vk-button" onClick={ this.handleOpenReplace }>Переместить</button> : null}
                {type === 'sorted' || type === 'folder' ? <button className="vk-button">Удалить</button> : null}
            </React.Fragment>);
        }
        return (<div className="content-item">
            {folderHeader}
        </div>);
    }
}

const mapStoreToProps = state => ({
    isFoldersLoading: state.folder.isLoading,
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
