// 一个循序渐进的函数式编程例子
// 所有内容都是写死
document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>'

// 用函数封装，接受不同参数
function printMessage(elementId, format, message) {
  document.querySelector(`#${elementId}`).innerHTML = 
    `<${format}>${message}</${format}>`
}

printMessage('msg', 'h1', 'Hello World')