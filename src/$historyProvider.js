/**
 * $historyProvider let you get an access to previous states/mode in your app,
 * when your state not depends on url
 */
app.provider('$history', function(){

    this.$get = function($state, $rootScope){
        var history = [];
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            event.preventDefault();
            if(fromState.abstract) return;
            history.push({state: fromState, params: fromParams});
        });
        function getPreviousState(){
            return history[history.length-1] || null;
        }

        function transitionToPrevious(){
            var prev = history.pop();
            if(!prev) throw new Error('there no previous state');

            if(_.isEmpty(prev.params))
                return $state.go(prev.state.name);
            else
                return $state.go(prev.state.name ,prev.params);
        }

        return {
            getPrevState: getPreviousState,
            goPrevState: transitionToPrevious
        }
    };

});
