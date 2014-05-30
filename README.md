#UI-router-utility

---
##Table of contents:

- [$historyProvider](#historyProvider)


###$historyProvider

$historyProvider let you get an access to previous states/mode in your app,
 when the state is not depends on url


```html

//get previous state object
$history.getPrevState().state 

//get previous stateParams object
$history.getPrevState().params

//go to previous state
$history.goPrevState()
//or
$history.goPrevState().then(callback)

```