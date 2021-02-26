# TS总结

# TypeScript

### 一、定义

[TypeScript](http://www.typescriptlang.org/) 是 JavaScript 的一个超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上。

它的第一个版本发布于 2012 年 10 月，经历了多次更新后，现在已成为前端社区中不可忽视的力量，不仅在 Microsoft 内部得到广泛运用，而且 Google 开发的 [Angular](https://angular.io/) 从 2.0 开始就使用了 TypeScript 作为开发语言，[Vue](https://vuejs.org/) 3.0 也使用 TypeScript 进行了重构。

目前，js 引擎无法读取 ts 代码，因此任何 ts 文件都有一个**预编译**过程

### 二、为什么要用 ts

TypeScript 是 JS 静态检查的最佳工具，也就是说，**在代码运行之前测试代码的正确性**。TypeScript 会自动让代码变得结构更好

### 三、js 有什么问题

到目前为止，JS 有七种类型

- String
- Number
- Boolean
- Null
- Undefined
- Object
- Symbol (ES6)

JS 的问题是，**值可以随时更改变量的类型**。例如，布尔类型可以变成字符串(将以下代码保存到名为 **types.js** 的文件中)

```js
var bool = true
bool = 'str'
复制代码
```

JS 松散的特性可能会在代码中造成严重的问题，破坏其可维护性。TypeScript 旨在通过向 JS 添加强类型来解决这些问题， TypeScript **强调有类型**（类型系统）

### 四、TS 的数据类型

- boolean 、number、string、null、 undefined、 Symbol

- undefined 和 null 类型的数据只能被赋值 undefined 和 null， undefined 和 null 类型是所有类型的子类型

- void 空类型

- any 类型

- 类型推断

  > 在 TS 中，变量在声明的时候，如果没有定义其类型，会被标识成默认类型
  >
  > ```js
  > // 在ts中，变量在声明的时候，如果没有定义其类型，会被识成默认类型
  > let str
  > str = 'I am string' // str会自动标识为string类型
  > str = 1024 // 报错
  > 
  > let num = 124 // num会自动标识为number类型
  > 复制代码
  > ```

- 联合类型和 type 类型别名 --> 类型别名用来给一个类型起个新名字。

  ```js
  // 联合类型可以访问 string 和 number 的共有属性
  type possible = string | number
  let data: possible = 123
  getLength(data) // 123
  function getLength(param: possible): string {
    return param.toString() // 必须是共有属性
  }
  
  // 联合类型的变量在被赋值的时候，会根据类型推论推断出一个类型
  let myNumber: string | number
  myNumber = 'Seven'
  console.log(myNumber.length)
  复制代码
  ```

- ##### 枚举 --> 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

  ```js
  enum Color{
    red = 1,
    green = 2
  }
  let c:Color = Color.green  // 2
  let colorName = Color[2]   // green
  console.log(c,colorName)   // 2  green
  复制代码
  ```

- 数组泛型

  > Array

- 数组类型

  > string[ ] number[ ]

- 元组类型 --> 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

  ```js
  let tom: [string, number]
  tom = ['Tom', 25]
  tom[0].slice(1)
  tom[1].toFixed(2)
  复制代码
  ```

- 函数的类型

  - 可选参数-->用 `?` 表示可选的参数 , 需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**

    ```js
    function buildName(a: string, b?: string) {
      if (b) {
        return a + ' ' + b
      } else {
        return a
      }
    }
    
    console.log(buildName('James')) // James
    console.log(buildName('James', 'Harden')) // James Harden
    复制代码
    ```

  - 默认参数-->在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数** , 此时就不受「可选参数必须接在必需参数后面」的限制了

    ```js
    function buildName(a: string = 'James', b: string) {
      return a + ' ' + b
    }
    
    console.log(buildName('Kevin', 'Durant')) //Kevin Durant
    console.log(buildName(undefined, 'Harden')) // James Harden
    复制代码
    ```

  - 剩余参数-->ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数

    ```js
    function test(arr: any[], ...rest: any[]) {
      rest.forEach((v) => {
        arr.push(v)
      })
    }
    let a: any[] = []
    test(a, 1, 2, 3, 4)
    console.log(a) // [1,2,3,4]
    复制代码
    ```

  - 重载-->重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

    ```js
    function reserve(x: number): number
    function reserve(x: string): string
    // 注：函数的返回类型要加上void，因为有可能什么都不返回
    function reserve(x: number | string): number | string | void {
      if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
      } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
      }
    }
    console.log(reserve(123))  // 321
    console.log(reserve('abc'))  // cba
    复制代码
    ```

- 类型断言--> 可以用来手动指定一个值的类型, 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

  ```js
  值 as 类型
  复制代码
  ```

  - 联合类型可以被断言为其中一个类型
  - 父类可以被断言为子类
  - 任何类型都可以被断言为 any
  - any 可以被断言为任何类型

  ##### 类型断言和类型转换

  ```js
  function toBoolean(a:any):boolean{
    return a as boolean
  }
  toBoolean(1) // 返回值为1
  // 类型断言不是类型转换，它不会真的影响到变量的类型。
  function toBoolean(a:any):boolean{
    return Boolean(a)
  }
  toBoolean(1) // 返回值为true
  复制代码
  ```

  类型声明是比类型断言更加严格的。

  所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅

  ### **[泛型](https://blog.csdn.net/semlinker/article/details/106882403)**

  定义 ： 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

  > 通俗的解释，泛型是类型系统中的“参数”，主要作用是为了类型的重用。从上面定义可以看出，它只会用在函数、接口和类中。它和 js 程序中的函数参数是两个层面的事物（虽然意义是相同的），因为 typescript 是静态类型系统，是在 js 进行编译时进行类型检查的系统，因此，泛型这种参数，实际上是在编译过程中的运行时使用。之所以称它为“参数”，是因为它具备和函数参数一模一样的特性。

  ```js
  // 首次看到 <T> 语法会感到陌生。但这没什么可担心的，就像传递参数一样，我们传递了我们想要用于特定函数调用的类型。
  function identity<T>(value: T): T {
    return value
  }
  identity<number>(123)  // 123
  
  // 传入两个类型
  function identity<T, U>(value: T, message: U): T {
    console.log(message)
    return value
  }
  const res = identity<number, string>(123, '信息')
  console.log(res)  // 信息  123
  复制代码
  ```

  `T` 被称为类型变量

  `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

  - K（Key）：表示对象中的键类型；
  - V（Value）：表示对象中的值类型；
  - E（Element）：表示元素类型。

  ```js
  function createArr(length: number, value: any): Array<any> {
    let res = []
    for (let i = 0; i < length; i++) {
      res.push(value)
    }
    return res
  }
  createArr < string > (3, 'x') //  ["x", "x", "x"]
  复制代码
  ```

  这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型

  `Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

  这时候，泛型就派上用场了：

  ```js
  // 在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
  function createArr<T>(length: number, value: T): Array<T> {
    let res: T[] = []
    for (let i = 0; i < length; i++) {
      res.push(value)
    }
    return res
  }
  // 接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来
  createArr(3, 'x') //  ["x", "x", "x"]
  复制代码
  ```

  ##### 泛型接口

  ```js
  // 泛型接口
  interface identities<T, U> {
    value: T
    msg: U
  }
  
  function identity<T, U>(value: T, msg: U) {
    let text: identities<T, U> = {
      value,
      msg,
    }
    return text
  }
  identity(123,'信息哈哈') // {value: 123, msg: "信息哈哈"}
  复制代码
  ```

  ##### 泛型类

  ```js
  // 泛型类
  interface InterfaceTest<U> {
    value: U
    getIdentity: () => U
  }
  
  class IdentityClass<T> implements InterfaceTest<T> {
    value: T
    constructor(value: T) {
      this.value = value
    }
    getIdentity(): T {
      return this.value
    }
  }
  
  let test = new IdentityClass<number>(123)
  console.log(test.getIdentity())  // 123
  复制代码
  ```

  什么时候使用泛型

  - 当你的函数、接口或类将处理多种数据类型时；
  - 当函数、接口或类在多个地方使用该数据类型时。

  ```js
  // 泛型默认参数 --> 可以为泛型指定默认参数
  interface A<T = string> {
    value: T;
  }
  const str: A = { value: 'Tom' }
  const num: A<number> = { value: 123 }
  复制代码
  ```

### 五、TypeScript 对象和接口

1. `Array<object>`，如果访问数组对象中的属性，会报错，因为普通 JS 对象中没有名为 `url` 的属性。TypeScript 对类型要求真的是很严谨。

2. `interface`接口（由类去实现）

   这里的问题是，咱们不能给一个随机对象分配属性，TypeScript 的核心原则之一，就是对值的结构进行`类型检查`, 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

   > 用接口来定义一个模型(放在代码顶部)

   ```js
   interface ILink {
     url:string,
     getName(a:number):void
   }
   // 提示:在定义接口名字前面加上大写的I，这是 TypeScript 的惯例。
   Array<ILink>
   复制代码
   ```

3. 任意属性 --> 一个接口中只能定义一个任意**属性**

   ```js
   interface Person {
   name: string
   age: number
   gender?: string // 可选属性
   // 任意属性any，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
   [play: string]: string | number | undefined | object
   // 一个接口中只能定义一个任意属性any。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
   }
   
   let Tom: Person = {
   name: 'tom',
   age: 11,
   gender: '男',
   play() {
    console.log('打篮球')
   },
   }
   复制代码
   ```

4. `readonly`只读属性 --> 有时候我们希望对象中的一些字段只能在**创建**的时候被赋值，那么可以用 `readonly` 只读属性

   ```js
   interface Person {
     readonly id: number
   name: string
     age?: number
   }
   
   let Tom: Person = {
     id: 9548,
     name: 'Tom  ',
   }
   Tom.id = 123 // 报错，无法分配到 "id" ，因为它是只读属性
   console.log(Tom)
   复制代码
   ```

##### 接口和字段

TypeScript 接口是该语言最强大的结构之一。接口有助于在整个应用程序中形成模型，这样任何开发人员在编写代码时都可以选择这种模型并遵循它。

TypeScript 可以通过函数声明来推断参数是 `ILink` 的类型数组。因此，该数组中的任何对象都必须实现接口 **ILink** 中定义的所有字段

大多数情况下，实现所有字段是不太现实的。毕竟，咱也不知道 `ILink` 类型的每个新对象是否会需要拥有所有字段。不过不要担心，要使编译通过，可以声明接口的字段**可选**，使用 `?` 表示：

```js
interface ILink {
  description?: string;
  id?: number;
  url: string;
}
复制代码
```

##### 接口继承接口

是否有办法重用接口 **ILink** ? 在 TypeScript 中，可以使用继承来扩展接口，关键字用 **extends** 表示：

扩展接口意味着借用其属性并扩展它们以实现代码重用

```js
interface ILink {
  description?: string;
  id?: number;
  url: string;
}
// 现在，IPost 类型的对象都将具有可选的属性 description、id、url和必填的属性 title 和body
interface IPost extends ILink {
  title: string;
  body: string;
}
复制代码
```

##### 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

```js
interface Alarm {
  alertMethod(): void;
}
interface Light {
  lightOn(): void;
}
class Door {}
class SecurityDoor extends Door implements Alarm {
  alertMethod() {
    console.log('防盗门alert')
  }
}
class Car implements Alarm, Light {
  alertMethod() {
    console.log('汽车alert')
  }
  lightOn() {
    console.log('开灯')
  }
}
复制代码
```

##### 接口继承类

`PointInstanceType` 相比于 `Point`，缺少了 `constructor` 方法，这是因为声明 `Point` 类时创建的 `Point` 类型是不包含构造函数的。另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不包括构造函数、静态属性或静态方法）。

换句话说，声明 `Point` 类时创建的 `Point` 类型只包含其中的实例属性和实例方法：

```js
class Point {
  /** 静态属性，坐标系原点 */
  static origin = new Point(0, 0)
  /** 静态方法，计算与原点距离 */
  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y)
  }
  /** 实例属性，x 轴的值 */
  x: number
  /** 实例属性，y 轴的值 */
  y: number
  /** 构造函数 */
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  /** 实例方法，打印此点 */
  printPoint() {
    console.log(this.x, this.y)
  }
}

interface PointInstanceType {
  x: number;
  y: number;
  printPoint(): void;
}

let p1: Point
let p2: PointInstanceType
复制代码
```

##### 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

```js
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
复制代码
```

相当于

```javasc
interface Alarm {
    price: number;
    weight: number;
}
复制代码
```

##### class 和 interface 声明数据类型的区别

> 由于 typescript 的宗旨是兼容 js，运行时要擦除所有类型信息，因此 interface 在运行时是会被完全**消除**的。而 class 经过编译后，在运行时依然**存在**。因此如果要声明的类型只是纯粹的类型信息，只需要声明 interface 即可。
>
> class 声明的数据类型可以定义默认值

### 八、vscode 配置自动编译 ts

1. 安装 ts

   > ```powershell
   > npm install -g typescript
   > 复制代码
   > ```

2. 创建 tsconfig.json 文件

   ```bash
   ## 生成配置文件
   tsc --init
   复制代码
   ```

3. tsconfig.json 配置 outdir 出口位置