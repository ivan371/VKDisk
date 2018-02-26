import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeUrls, urls } from '../../constants';
import PropTypes from 'prop-types';
import { docsUnMount, loadDocs } from '../../actions/document';
import { loadFilterFolders } from '../../actions/folder';
import Tile from '../Tile';

class DocsComponent extends React.Component {
    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            this.props.loadDocs(makeUrls.makeFilterDocsFolder(this.props.params.id));
            this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(this.props.params.id));
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.props.loadDocs(makeUrls.makeFilterDocsFolder(nextProps.params.id));
                this.props.loadFilterFolders(makeUrls.makeFilterFoldersFolder(nextProps.params.id));
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.params.hasOwnProperty('id') && prevProps.params.hasOwnProperty('id')) {
            this.props.docsUnMount();
        }
    }

    componentWillUnmount() {
        this.props.docsUnMount();
    }
    render() {
        let docList = [];
        if (this.props.isLoading) {
            docList = this.props.docList.map(docId => <Tile title={ this.props.docs[docId].title } key={ docId } imgUrl="/static/img/file.png" />);
        }
        return (
            <div className="page-content-content-content content-flex">
                {docList}
            </div>
        );
    }
}

const mapStoreToProps = (state, props) => ({
    isLoading: state.document.isLoading,
    docList: state.document.docList,
    docs: state.document.docs,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        docsUnMount,
        loadFilterFolders,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent);
