import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modalOpen } from '../../actions/modal';

class BackFolderComponent extends React.Component {
    static propTypes = {
        imgUrl: PropTypes.string.isRequired,
    };


    render() {
        return (
            <React.Fragment>
                <div className="content-flex-item">
                    <img className="icon" src={ this.props.imgUrl } />
                </div>
            </React.Fragment>
        );
    }
}


const mapStoreToProps = (state, props) => ({
    isOpen: state.modal.isOpen,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        modalOpen,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(BackFolderComponent);
