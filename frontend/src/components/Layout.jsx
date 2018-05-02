import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const VkLink = ({ link, content }) => (
    <Link to={ link }>
        <span className="page-content-link">
            {content}
        </span>
    </Link>
);

class LayoutComponent extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object,
    };


    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="page-header-content" >
                        <div className="page-header-content-logo">
                            <h2>VK DISK</h2>
                        </div>
                        {this.props.isLoading ? '' : <div className="page-header-content-self">
                            <div>{`${this.props.user.first_name} ${this.props.user.last_name}`}</div>
                            <img className="avatar" src={this.props.user.avatar}/>
                            </div>}
                    </div>
                </div>
                <div className="page-content">
                    <div className="page-content-navigation" />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStoreToProps = (state) => ({
    user: state.page.user,
    isLoading: state.page.isLoading,
});
export default withRouter(connect(
    mapStoreToProps
)(LayoutComponent));
