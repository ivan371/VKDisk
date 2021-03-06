import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tileType } from '../../constants';
import Tile from '../tile/Tile';

class DocsTileComponent extends React.Component {
    static propTypes = {
        docList: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };
    render() {
        let docList = [];
        if (this.props.isLoading) {
            docList = this.props.docList.map(docId => (<Tile
                folder={ this.props.folder }
                history={ this.props.history }
                id={ docId }
                url={ this.props.docs[docId].vk_url }
                title={ this.props.docs[docId].title }
                key={ docId }
                type={ tileType.file }
                isModal={ false }
            />));
        }
        return (<React.Fragment>
            {this.props.isLoading ? docList :
                <div className="load">
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                </div>}
            </React.Fragment>);
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.document.isLoading,
    docList: state.document.docList,
    docs: state.document.docs,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsTileComponent);
