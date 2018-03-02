import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateFolder } from '../actions/folder';
import {makeUrls, tileType} from '../constants';
import {updateDoc} from "../actions/document";

class TileComponent extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        updateFolder: PropTypes.func.isRequired,
        updateDoc: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
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

    onUpdate = (e) => {
        if (e.keyCode === 13) {
            switch (this.props.type) {
                case tileType.folder:
                    this.props.updateFolder(makeUrls.makeCustomFolder(this.props.id), this.state.title);
                    break;
                case tileType.file:
                    this.props.updateDoc(makeUrls.makeCustomFile(this.props.id), this.state.title);
                    break;
                default:
            }
            this.onHandleChange(e);
        }
    };

    render() {
        return (
            <div className="content-flex-item">
                <Link to={ this.props.url }>
                    <img className="icon" src={ this.props.imgUrl } />
                </Link>
                {!this.state.isClicked ?
                    <div className="content-item__title" onClick={ this.onHandleChange }>{this.props.title}</div>
                    : <input
                        className="content-item__input"
                        value={ this.state.title }
                        onChange={ this.onChange }
                        onKeyDown={ this.onUpdate }
                        name="title"
                    />
                }
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        updateFolder,
        updateDoc,
    }, dispatch),
});


export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TileComponent);
