/**
* 返回一个随机的小写字母
*/
export function getLowerCharacter(){
  return getCharacter("lower");
}


/**
* 返回一个随机的大写字母
*/
export function getUpperCharacter(){
  return getCharacter("upper");
}


/**
* 返回一个字母
*/
function getCharacter(flag){
  var character = "";
  if(flag === "lower"){
      character = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0));
  }
  if(flag === "upper"){
      character = String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0));
  }
  return character;
}
