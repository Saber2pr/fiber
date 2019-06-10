import render, { useState, useMemo, useEffect } from '..'

render(
  () => {
    console.log(0)
  },
  () => {
    const [state, setState] = useState(20)
    console.log(state)

    useEffect(() => {
      setTimeout(() => setState(state + 200), 1000)
    })
  },
  () => {
    const [state, setState] = useState('state')

    useMemo(() => console.log(state), [state])()
    setState('hello')
  },
  () => {
    console.log(3)
  }
)
