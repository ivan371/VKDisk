import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class FolderComponent extends React.Component {
    render() {
        return (
            <div className="content-item">
                {this.props.title}
            </div>
        );
    }
}

FolderComponent.propTypes = {
    id: PropTypes.number.isRequired,
};


const mapStoreToProps = (state, props) => ({
    title: state.folder.folders[props.id].title,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(FolderComponent);
