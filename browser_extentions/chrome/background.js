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
    }).then(response => {
        chrome.runtime.sendMessage({type: "COMPLETE_LOGIN_VK"});
    });
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

function loadVKAuth(vk_url, sendResponse) {
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

function openSite() {
    chrome.tabs.create({url: SITE_URL, active: true});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "LOGIN_VK" && request.vk_url) {
        loadVKAuth(request.vk_url);
    }
    if (request.type === "OPEN_SITE") {
        openSite();
    }
});