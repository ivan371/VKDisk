import React from 'react';
import { tags } from './../../constants';
import Tag from './Tag';

export default class TagsComponent extends React.PureComponent {
    render() {
        const tagList = tags.map(tag => (
            <Tag
                key={ tag.id }
                name={ tag.name }
                value={ tag.value }
                filterName={ tag.filterName }
                type={ tag.type }
            />));

        return (<div className="tags">
            { tagList }
        </div>);
    }
}
