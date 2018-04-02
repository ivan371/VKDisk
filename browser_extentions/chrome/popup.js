SITE_URL = "http://localhost:8000";
AUTH_URLS = SITE_URL + "/accounts/oauth_urls/";
LOGOUT_URL = SITE_URL + "/accounts/logout/";

function loadVKAuth(vk_url) {
    makeLoadingPopup();
    chrome.runtime.sendMessage({vk_url: vk_url, type: "LOGIN_VK"}, function (response) {
        loadContentPage();
    });
}

function openSite() {
    chrome.runtime.sendMessage({type: "OPEN_SITE"});
}

function logout() {
    fetch(LOGOUT_URL, {
            // method: "POST",
            // body: data,
            mode: 'cors',
            credentials: "same-origin"
        }
    ).then(() => {
        loadContentPage();
    })
}

function buildLoggedInPopup(response) {
    let visitSiteBtn = $("<div><button class='login-btn'>Перейти на сайт</button></div>");
    visitSiteBtn.click(openSite);
    let logoutBtn = $("<a class='logout-btn'>Logout</a>").attr('href', LOGOUT_URL);
    logoutBtn.click(logout);
    let content = $("<div><h3>Вы авторизированы.</h3></div>");
    content.append(visitSiteBtn);
    content.append(logoutBtn);
    return content;
}

function buildLoginPopup(response) {
    var loginBtn = $("<button class='login-btn'><img src='https://vk.com/images/svg_icons/ic_head_logo.svg' width='20px'> Войти через ВКонтакте </button>");
    let vk_url = response.vk_url;
    loginBtn.click(() => loadVKAuth(vk_url));
    var elem = $("<div><h3>Чтобы войти нажмите кнопку:</h3></div>");
    elem.append(loginBtn);
    return elem;
}

function buildLoadingPopup() {
    return "<p>Загрузка</p>";
}

function makeLoadingPopup() {
    let content_block = $("#content");
    content_block.html(buildLoadingPopup());
}

function loadContentPage() {
    let content_block = $("#content");
    content_block.html(buildLoadingPopup());

    fetch(AUTH_URLS, {mode: 'cors', credentials: "same-origin"}).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "ok") {
            content_block.html(buildLoggedInPopup(json));
        } else {
            content_block.html(buildLoginPopup(json))
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case "COMPLETE_LOGIN_VK":
            loadContentPage();
            break;
        case "LOGIN_VK":
            makeLoadingPopup();
            break;
    }
});

$(document).ready(loadContentPage);
