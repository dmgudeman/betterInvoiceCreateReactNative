export default _addNavigationHelpers = (navigation)=> {
  const original = addNavigationHelpers(navigation);
  let debounce;
  return {
    ...original,
    navigateWithDebounce: (routeName, params, action) => {
      let func = () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          navigation.dispatch(NavigationActions.navigate({
            routeName,
            params,
            action
          }));
        }, 200)
      }
      return func();
    }
  }
}