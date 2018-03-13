SITE_URL = "http://localhost:8000";
AUTH_URLS = SITE_URL + "/accounts/oauth_urls/";

function loadVKAuth(vk_url) {
    // chrome.tabs.create({url: SITE_URL + vk_url, active: true}, (tab) => {
    //     let authTabId = tab.id;
    //     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //             if (tabId == authTabId && changeInfo.url != undefined) {
    //                 if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
    //                     let url = changeInfo.url.split('#')[1];
    //                     let params = parseQuery(url);
    //                     fetch_login_form(params.code, params.state);
    //                 }
    //             }
    //         }
    //     );
    // });
    chrome.runtime.sendMessage({vk_url: vk_url, send_vk_request: true});
}

$(document).ready(() => {
    let my_text = $("#my_text");

    fetch(AUTH_URLS, {mode: 'cors', credentials: "same-origin"}).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "ok") {
            my_text.html("Ok");
        } else {
            let vk_url = json.vk_url;
            my_text.click(() => loadVKAuth(vk_url));
        }
    });
});