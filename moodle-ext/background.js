function sendCurrentUrl(url) {
    var req = new XMLHttpRequest();
    req.addEventListener('readystatechange', function (evt) {
      if (req.readyState === 4) {
        if (req.status === 200) {
          console.log('Saved !');
        } else {
          console.log("ERROR: status " + req.status);
        }
      }
    });
    req.open('POST', 'https://localhost/db1/insertdb.php', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send('url=' + encodeURIComponent(url));
  }
  
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
      const obtainedUrl = current_tab_info.url;
      if( obtainedUrl!=undefined  && obtainedUrl!=''&& obtainedUrl.startsWith("https://"))
      {
        sendCurrentUrl(obtainedUrl);
        console.log(obtainedUrl);
      }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.url!=undefined  && changeInfo.url!='' && changeInfo.url.startsWith("https://"))
  {console.log(changeInfo.url);
  sendCurrentUrl(changeInfo.url);
  }
}); 

