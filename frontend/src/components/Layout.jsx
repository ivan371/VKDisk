import React from 'react';
import { Link } from "react-router-dom";

class LayoutComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="page-header-content" />
                </div>
                <div className="page-content">
                    <div className="page-content-navigation">
                        <Link to="/root">
                            <span className="page-content-link">
                                All items
                            </span>
                        </Link>
                        <Link to="/chat">
                            <span className="page-content-link">
                                Dialogs
                            </span>
                        </Link>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayoutComponent;
