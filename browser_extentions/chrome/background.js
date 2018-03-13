SITE_URL = "http://localhost:8000";

function fetch_login_form(code, state) {
    let data = new FormData();
    data.append('code', code);
    data.append('state', state);
    fetch(SITE_URL + "/social/complete/vk-oauth2/", {
        method: "POST",
        body: data,
        mode: 'cors',
        credentials: "same-origin"
    }).then(response => {});
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function loadVKAuth(vk_url) {
    chrome.tabs.create({url: SITE_URL + vk_url, active: true}, (tab) => {
        let authTabId = tab.id;
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                if (tabId == authTabId && changeInfo.url != undefined) {
                    if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
                        let url = changeInfo.url.split('#')[1];
                        let params = parseQuery(url);
                        fetch_login_form(params.code, params.state);
                        chrome.tabs.remove(tabId);
                    }
                }
            }
        );
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.send_vk_request === true && request.vk_url != undefined) {
        loadVKAuth(request.vk_url);
    }
});