export function depthOf(object) {
  var level = 1;
  var key;
  for(key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if(typeof object[key] == 'object'){
      var depth = depthOf(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }
  return level;
}