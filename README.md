# @saber2pr/fiber

> fiber.

## Why

`Generator` 生成的 `IterableIterator` 无法保存 `中断` 位置，每次调用 next 将丢失上一个断点。

```ts
let current: IterableIterator<any>

function* gen() {
  yield 1
  yield 2
  yield 3
}

current = gen()

let temp = current

current.next()

temp // has change
```

而 `fiber` 由于直接暴露出 `current` 指针，可以随时`访问`和`存储`当前 `断点`。

```ts
let temp

while (fiber) {
  current = fiber

  fiber.type() // if temp = current, temp will not change following the current.

  collect(fiber)

  fiber = fiber.next
}
```

---

## start

```bash
npm install
```

```bash
npm start

npm test

```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
