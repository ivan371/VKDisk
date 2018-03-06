import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {switchFolder, updateFolder} from '../../actions/folder';
import { format, makeUrls, tileType, makeFormat } from '../../constants';
import { checkFile, updateDoc } from '../../actions/document';

class TileComponent extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        updateFolder: PropTypes.func.isRequired,
        updateDoc: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        checkFile: PropTypes.func.isRequired,
        isModal: PropTypes.bool.isRequired,
        switchFolder: PropTypes.func.isRequired,
    };

    state = {
        isClicked: false,
        title: this.props.title,
        isChecked: false,
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

    handleClick = (e) => {
        if (!this._delayedClick) {
            this._delayedClick = _.debounce(this.doClick, 500);
        }
        if (this.clickedOnce) {
            this._delayedClick.cancel();
            this.clickedOnce = false;
            this.props.history.push(this.props.url);
        } else {
            this._delayedClick(e);
            this.clickedOnce = true;
        }
    };

    doClick = (e) => {
        this.clickedOnce = undefined;
        if (!this.props.isModal) {
            this.setState({isChecked: !this.state.isChecked});
            this.props.checkFile(this.props.id);
        } else {
            this.props.switchFolder(this.props.id);
        }
    };

    render() {
        let imageUrl = null;
        switch (this.props.type) {
            case tileType.folder:
                imageUrl = format.folder;
                break;
            case tileType.file:
                imageUrl = makeFormat(this.props.title);
                break;
            default:
        }
        return (
            <div className={ `content-flex-item ${!this.state.isChecked ? '' : 'checked'}` }>
                <img className="icon" onClick={ this.handleClick } src={ imageUrl } />
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
        checkFile,
        switchFolder,
    }, dispatch),
});


export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps,
)(TileComponent));
