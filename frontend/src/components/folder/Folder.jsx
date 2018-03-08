import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { folderType, format } from '../../constants';

class FolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        folder: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    };

    render() {
        let link = null;
        switch (this.props.folder) {
            case folderType.root:
                link = `/root/${this.props.id}`;
                break;
            case folderType.chat:
                link = `/chat/${this.props.id}`;
                break;
            default:
        }
        return (
            <Link to={ link }>
                <div className="content-item page-content-link-item">
                    <div><img className="item" src={ format.folder } /></div>
                    <div>{this.props.title}</div>
                </div>
            </Link>
        );
    }
}


const mapStoreToProps = (state, props) => ({
    title: state.folder.folders[props.id].title,
    type: state.folder.folders[props.id].type,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(FolderComponent);
