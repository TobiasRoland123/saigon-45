import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '..')
const file = path.join(root, 'src/app/(payload)/admin/importMap.js')

const source = await readFile(file, 'utf8')
const options = await prettier.resolveConfig(file)
const formatted = await prettier.format(source, {
  ...options,
  filepath: file,
  quoteProps: 'as-needed',
  singleQuote: true,
})

await writeFile(file, formatted)
