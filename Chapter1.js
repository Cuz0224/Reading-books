// *一个循序渐进的函数式编程例子
// 所有内容都是写死
document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>'

// 用函数封装，接受不同参数
function printMessage(elementId, format, message) {
  document.querySelector(`#${elementId}`).innerHTML = 
    `<${format}>${message}</${format}>`
}

printMessage('msg', 'h1', 'Hello World')
// 任然不是一段可重用的代码。比如只能写入HTML界面，而不能将其写入文件

// 函数式的 printMessage
const printMessage = run(addToDom('msg'), h1, echo)
// h1 echo addToDom 均是函数

// *命令式编程与声明式编程
// 计算一个数组中所有数的平方
// 命令式编程
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let i = 0; i < array.length; i++){
  array[i] = Math.pow(array[i], 2)
}
console.log(array)

// 函数式编程
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  num => Math.pow(num, 2)
)

// *一个短小的命令式程序 => 函数式程序
// 功能：通过社会安全号码（SSN）找到一个学生的记录并渲染在浏览器中
// 命令式的 showStudent 函数以及产生的副作用
function showStudent(ssn) {
  var student = db.get(ssn)
  if (student !== null) {
    document.querySelector('#${elementId}').innerHTML = 
      `${student.ssn},
      ${student.firstname},
      ${student,lastname}`
  } else {
    throw new Error('Student not found!')
  }
}

showStudent('444-44-44444')
// 副作用：
// 1.为访问数据与外部资源进行了交互，函数签名并没有声明该参数，这个引用可能为 null，
// 或在调用间隔改变，从而导致完全不同的结果并破坏了程序的完整性。
// 2. 全局变量 elementId 可能随时改变，难以控制
// 3. HTML元素被直接修改了，HTML 文档本身是一个可变的，共享的全局资源
// 4. 如果没有找到考生，该函数可能会抛出一个异常，这将导致整个程序的栈回退并突然结束

// 进行函数式修改
// 1. 将这个长函数分离成多个具有单一职责的短函数
// 2. 通过显式地将完成功能所需的依赖都定义为函数来减少副作用的数量

// 函数 find 需要对象存储的引用和 ID 来查找学生
const find = curry(function (db, id) {
  var obj = db.get(id)
  if (obj === null) {
    throw new Error('Object not found!')
  }
  return obj
})
// 将学生对象转换成用逗号分隔的字符串
const csv = function(student){
  return `${student.ssn}, ${student.firstname}, ${student.lastname}`
}
// 为了在屏幕上显式学生信息，这里需要 elementId 以及学生的数据
const append = curry(function (elementId, info){
  document.querySelector(elementId).innerHTML = info
})

var showStudent = run(
  append('#student-info'),
  csv,
  find(db)
)
showStudent('444-44-44444')
// 优势：
// 1. 灵活了很多，有了三个可被重用的组件
// 2. 这种细颗粒度函数的重用是提高工作效率的一种手段，因为你可以大大减少需要主动维护的代码量
// 3. 声明式的代码风格提供了程序需要执行的那些高阶步骤的一个清晰视图，增强了代码的可读性
// 4. 更重要的是，与 HTML 对象的交互被移动到一个单独的函数中，将纯函数从不纯的行为中分离出来