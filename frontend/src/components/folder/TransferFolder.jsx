import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
class CreateFolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };


    render() {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p>Переместить файл</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-content__img">
                    </div>
                    <div className="modal-input">
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(CreateFolderComponent);
