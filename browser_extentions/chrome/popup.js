SITE_URL = "http://localhost:8000";
AUTH_URLS = SITE_URL + "/accounts/oauth_urls/";

function loadVKAuth(vk_url) {
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
