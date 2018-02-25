import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class DocComponent extends React.Component {
    render() {
        return (
            <div className="content-flex-item">
                {this.props.title}
            </div>
        );
    }
}

DocComponent.propTypes = {
    id: PropTypes.number.isRequired,
};


const mapStoreToProps = (state, props) => ({
    title: state.document.docs[props.id].title,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocComponent);
