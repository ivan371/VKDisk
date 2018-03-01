import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TileComponent extends React.Component {
    render() {
        return (
            <div className="content-flex-item">
                <Link to={ this.props.url }>
                    <img className="icon" src={ this.props.imgUrl } />
                    <p>{this.props.title}</p>
                </Link>
            </div>
        );
    }
}

TileComponent.propTypes = {
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default TileComponent;
