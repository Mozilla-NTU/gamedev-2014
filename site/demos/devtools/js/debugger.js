function doSomething() {
  console.log('doing something');
  doSomethingElse();
}

function doSomethingElse() {
  console.log('doing something else');
  throwError();
}

function throwError() {
  console.warn('throwing error');
  throw new Error('Some silly error');
}

function handleClick() {
  console.log('handling click');
  doSomething();
}

window.onload = function() {
  var button = document.getElementById('button');
  button.addEventListener('click', handleClick);
};
