import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FolderComponent extends React.Component {
    render() {
        const link = `/root/${this.props.id}`;
        return (
            <Link to={ link }>
                <div className="content-item page-content-link-item">
                    <div><img className="item" src="/static/img/folder.png"/></div>
                    <div>{this.props.title}</div>
                </div>
            </Link>
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
