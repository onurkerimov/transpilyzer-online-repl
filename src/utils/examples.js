export const examples = {
  counter: `/** @jsx h */
import Doja, { create, watch, h } from 'doja'

const Counter = Doja(() => {
  const $counter = create(0)
  watch(() => console.log($counter.value))

  return () => (
    <button 
      onClick={() => $counter.value++} 
      style={{ border: '10px solid indianred' }}
    >
      count: {$counter.value}
    </button>
  )
})
`,
  counterClass: `/** @jsx h */
import Doja, { create, watch, h } from 'doja'

class Counter extends Doja {
  counter = 0
  setup() {
    watch(() => console.log($counter.value))
  }
  render = () => (
    <button 
      onClick={() => this.counter++} 
      style={{ border: '1px solid red' }}
    >
      count: {this.counter}
    </button>
  )
}
`,
composition: `/** @jsx h */
/** @jsxFrag Fragment */
import Doja, { create, watch, h, Fragment } from 'doja'

const Button = Doja((props) => {
  return () => <button onClick={props.onClick}>{props.label}</button>
})

const Counter = Doja(() => {
  const $counter = create(0)
  watch(() => console.log($counter.value))

  return () => (
    <>
      count: {$counter.value}
      <Button label="+" onClick={() => $counter.value++} />
      <Button label="-" onClick={() => $counter.value--} />
    </>
  )
})
`,
compositionSlots: `/** @jsx h */
/** @jsxFrag Fragment */
import Doja, { create, watch, slots, h, Fragment } from 'doja'

const Button = Doja((props) => {
  return () => <button onClick={props.onClick}>{slots()}</button>
})

const Counter = Doja(() => {
  const $counter = create(0)
  watch(() => console.log($counter.value))

  return () => (
    <>
      count: {$counter.value}
      <Button onClick={() => $counter.value++}>+</Button>
      <Button onClick={() => $counter.value--}>-</Button>
    </>
  )
})
`,
dependencyInjection: `/** @jsx h */
import Doja, { create, inject, h } from 'doja'

const CounterInner = Doja(() => {
  const $counter = inject(CounterSymbol)

  return () => (
    <button 
      onClick={() => $counter.value++} 
      style={{ border: '1px solid red' }}
    >
      count: {$counter.value}
    </button>
  )
})

const CounterSymbol = Symbol()

// Using symbols as providers! 😎
const Counter = Doja(() => {
  const $counter = create(0)
  return () => (
  	<CounterSymbol value={$counter}>
      <CounterInner />
    </CounterSymbol>
  )
})
`
}
