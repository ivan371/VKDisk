import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../../actions/modal';
import { bulkUpdateDocs } from '../../actions/document';
import { makeUrls } from '../../constants';

class DocsDeleteComponent extends React.Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        modalOpen: PropTypes.func.isRequired,
        bulkUpdateDocs: PropTypes.func.isRequired,
        checkList: PropTypes.array.isRequired,
    };

    handleClose = () => {
        this.props.modalOpen();
    };

    handleBulkDelete = () => {
        this.props.bulkUpdateDocs(makeUrls.makeDeleteDocs(), this.props.checkList);
        this.props.modalOpen();
    };

    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p>Delete files</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="content-flex-modal">
                        <p>Are you realy want to delete {this.props.count} files?</p>
                    </div>
                    <button className="vk-button" onClick={ this.handleBulkDelete }>Delete</button>
                    <button className="vk-button" onClick={ this.handleClose } >Cancel</button>
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = state => ({
    count: state.document.countCheck,
    checkList: state.document.checkList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
        bulkUpdateDocs,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsDeleteComponent);
