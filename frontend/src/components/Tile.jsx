import React from 'react';
import PropTypes from 'prop-types';

class TileComponent extends React.Component {
    render() {
        return (
            <div className="content-flex-item">
                <img className="icon" src={ this.props.imgUrl } />
                {this.props.title}
            </div>
        );
    }
}

TileComponent.propTypes = {
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default TileComponent;
