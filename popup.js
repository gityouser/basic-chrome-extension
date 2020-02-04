const {
  storage: {sync},
  tabs: {query, executeScript}
} = chrome;
const changeColorButton = document.getElementById('changeColor');

// request the color value from storage and
// apply it to changeColorButton
sync.get('color', function(data){
  changeColorButton.style.backgroundColor = data.color;
  changeColorButton.setAttribute('value', data.color);
})

changeColor.onClick = function(element) {
  let color = element.target.value;
  query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      executeScript(
        tabs[0].id,
        {
          code: 'document.body.style.backgroundColor = "' + color + '";'
        }
      )
    }
  )
}