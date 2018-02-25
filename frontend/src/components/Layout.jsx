import React from 'react';
import { Link } from 'react-router-dom';

const VkLink = ({ link, content }) => (
    <Link to={ link }>
        <span className="page-content-link">
            {content}
        </span>
    </Link>
);

class LayoutComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="page-header-content" >
                        <div className="page-header-content-logo">
                            <h2>VK DISK</h2>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="page-content-navigation">
                        <VkLink link="/root" content="All items" />
                        <VkLink link="/chat" content="Dialogs" />
                    </div>
                    <div className="page-content-content">
                        <div className="page-content-content-wrap">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutComponent;
