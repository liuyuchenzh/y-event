import e from '../lib/index.js'
// emit first
e.$always('test')
e.$on('test', msg => {
  console.log('test works', msg)
})
e.$emit('test', 'from emit')

// normal emit won't cause fire
e.$emit('test2')
e.$on('test2', () => {
  console.log('oops, test2 works, which is bad')
})

// args
e.$on('test3', (...args) => {
  console.log('test3 works', ...args)
})
e.$emit('test3', 1, 2, 3)

// off
e.$off('test3')
e.$emit('test3')

// off then emit more than once
e.$emit('test3')
