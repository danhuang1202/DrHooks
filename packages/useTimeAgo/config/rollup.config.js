import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import pkg from '../package.json'

const extensions = ['.ts']
const exclude = 'node_modules/**'

const entries = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ]
  }
]

const options = entries.map(entry => {
  const { input, output } = entry

  return {
    input,
    output,
    plugins: [
      external(),
      commonjs(),
      babel({
        extensions,
        exclude
      }),
      resolve({
        extensions
      })
    ]
  }
})

export default options
