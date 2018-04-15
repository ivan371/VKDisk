import { CALL_API, getJSON } from 'redux-api-middleware';
import cookie from 'react-cookies';

export function apiLoad(url, method, types, body, normalizer, isSimple, id, root) {
    return {
        [CALL_API]: {
            credentials: 'same-origin',
            endpoint: url,
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': cookie.load('csrftoken') },
            method,
            body,
            types: [
                types[0],
                {
                    type: types[1],
                    payload: (action, state, res) => {
                        if (method === 'DELETE') {
                            return { id, root };
                        }
                        return getJSON(res).then((json) => {
                            if (isSimple) {
                                return normalizer(json);
                            }
                            return Object.assign({}, normalizer(json.results), { count: json.count });
                        });
                    },
                },
                types[2],
            ],
        },
    };
}
