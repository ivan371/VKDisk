import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { urls } from '../../constants';
import PropTypes from 'prop-types';
import { docsUnMount, loadDocs } from '../../actions/document';
import Doc from './Doc';

class DocsComponent extends React.Component {
    componentDidMount() {
        if (this.props.params.hasOwnProperty('id')) {
            this.props.loadDocs(`${urls.docs.docsUrl}?folder=${this.props.params.id}`);
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.params.hasOwnProperty('id')) {
            if (this.props.params.id !== nextProps.params.id) {
                this.props.loadDocs(`${urls.docs.docsUrl}?folder=${nextProps.params.id}`);
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
            docList = this.props.docList.map(docId => <Doc id={ docId } key={ docId }>Папка</Doc>);
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
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadDocs,
        docsUnMount,
    }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps,
)(DocsComponent);
