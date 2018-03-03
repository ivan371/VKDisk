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
        title: PropTypes.string.isRequired,
    };

    state = {
        isClicked: false,
        title: this.props.title,
    };

    onHandleChange = (e) => {
        this.setState({ isClicked: !this.state.isClicked });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
                    {!this.state.isClicked ?
                        <div onClick={ this.onHandleChange }>{this.props.title}</div>
                        : <input
                            className="page-content-item__input"
                            value={ this.state.title }
                            onChange={ this.onChange }
                            onKeyDown={ this.onUpdate }
                            name="title"
                        />
                    }
                    <img className="item-right" src="/static/img/edit.png"/>
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
