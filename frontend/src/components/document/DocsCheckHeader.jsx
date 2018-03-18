import React from 'react';
import PropTypes from 'prop-types';
import { modalType, items } from '../../constants';

export default class DocsCheckHeader extends React.Component {
    static propTypes = {
        modalOpen: PropTypes.func.isRequired,
        setModal: PropTypes.func.isRequired,
        countCheck: PropTypes.number.isRequired,
        checkAll: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
    };

    handleOpenCopy = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderTransfer);
    };

    handleOpenReplace = () => {
        this.props.modalOpen();
        this.props.setModal(modalType.folderReplace);
    };


    handleClearAll = () => {
        this.props.checkAll();
    };


    render() {
        if (this.props.type !== 'chat') {
            return (<React.Fragment>
                <div className="item-name">{this.props.countCheck} files</div>
                <img src={ items.clear } className="item-left" onClick={ this.handleClearAll } />
                <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>
                <button className="vk-button" onClick={ this.handleOpenReplace }>Переместить</button>
                <button className="vk-button">Удалить</button>
            </React.Fragment>);
        }
        return <React.Fragment>
            <div className="item-name">{this.props.countCheck} files</div>
            <img src={ items.clear } className="item-left" onClick={ this.handleClearAll } />
            <img src={ items.clear } className="item-left" />
            <button className="vk-button" onClick={ this.handleOpenCopy }>Копировать</button>
        </React.Fragment>;
    }
}
