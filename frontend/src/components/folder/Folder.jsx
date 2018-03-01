import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {folderType} from "../../constants";

class FolderComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        folder: PropTypes.string.isRequired,
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
                    <div><img className="item" src="/static/img/folder.png" /></div>
                    <div>{this.props.title}</div>
                </div>
            </Link>
        );
    }
}


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
