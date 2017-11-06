export function headImg(name) {
  name = JSON.stringify(name);
  var reg = new RegExp('\\[\/(.+?)\\]',"g");
  var ss =  name.replace(reg,"<img style='height:1rem;' src='/emoji/emoji_$1.png'/>");
  ss = JSON.parse(ss);
  return ss;
}
// const headImg = function (name) {
//     name = JSON.stringify(name);
//     var reg = new RegExp('\\[\/(.+?)\\]',"g");
//     var ss =  name.replace(reg,"<img style='height:1rem;vertical-align: top' src='/emoji/emoji_$1.png'/>");
//     ss = JSON.parse(ss);
//     return ss;
// }
// export{
//   headImg
// }
