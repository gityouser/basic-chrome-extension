const {
  storage: {sync},
  runtime: {onInstalled},
  declarativeContent: {
    onPageChanged,
    PageStateMatcher,
    ShowPageAction
  },
} = chrome;
const green = '#3aa757';

onInstalled.addListener(function() {
  sync.set(
    {color: green},
    function() {
      console.log('The color is green.');
    }
  );
  // below I am letting the browser know when it can interact with popup.html
  // from the the page_action declared in the manifest 
  onPageChanged.removeRules(undefined, function(){
    onPageChanged.addRules([{
      conditions: [new PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new ShowPageAction()]
    }])
  })
})
