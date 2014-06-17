/**
 * Created by Ariel Mashraki
 * $historyProvider let you get an access to previous states/mode in your app,
 * when your state not depends on url
 */
function HistoryProvider() {

  this.$get = function($state, $rootScope) {

    var history = [], onAction = false;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if(fromState.abstract || onAction) return;
      history.push({state: fromState, params: fromParams});
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      onAction = false;
    });

    function getPreviousState() {
      return _.last(history) || null;
    }

    function transitionToPrevious() {
      onAction = true;
      var prev = history.pop();
      if(!prev) return false;

      if(_.isEmpty(prev.params))
        return $state.go(prev.state.name);
      else
        return $state.go(prev.state.name ,prev.params);
    }

    return {
      getPrevState: getPreviousState,
      goPrevState: transitionToPrevious
    };

  };

}
