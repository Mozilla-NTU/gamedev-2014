var cool = document.getElementById('cool');
cool.onclick = function() {
  console.log('\n\n'+
"             _.-~-.\n" +
"           7''  Q..\\\n" +
"        _7         (_\n" +
"      _7  _/    _q.  /\n" +
"    _7 . ___  /VVvv-'_                                            .\n" +
"   7/ / /~- \\_\\\\      '-._     .-'                      /       //\n" +
"  ./ ( /-~-/||'=.__  '::. '-~'' {             ___   /  //     ./{\n" +
" V   V-~-~| ||   __''_   ':::.   ''~-~.___.-'' _/  // / {_   /  {  /\n" +
"  VV/-~-~-|/ \\ .'__'. '.    '::                     _ _ _        ''.\n" +
"  / /~~~~||VVV/ /  \\ )  \\        _ __ ___   ___ ___(_) | | __ _   .::'\n" +
" / (~-~-~\\\\.-' /    \\'   \\::::. | '_ ` _ \\ / _ \\_  / | | |/ _` | :::'\n" +
"/..\\    /..\\__/      '     '::: | | | | | | (_) / /| | | | (_| | ::'\n" +
"vVVv    vVVv                 ': |_| |_| |_|\\___/___|_|_|_|\\__,_| ''");
console.log('\nhello NTU students!\n');

};

var error = document.getElementById('error');
error.onclick = function() {
  throw new Error('OUCH, an ERROR!!');
}
