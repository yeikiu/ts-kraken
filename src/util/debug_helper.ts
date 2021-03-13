import { parse } from 'path'
import debugLib, { Debugger } from 'debug'

/* RECOMMENED TO MATCH PROJECT'S NAME */
const DEBUG_PREFIX = 'ts-kraken'

export default (fileName: string, label = DEBUG_PREFIX): { debug: Debugger; logError: Debugger; print: Debugger } => {
  const filePath = parse(fileName).name

  const debug = debugLib(`${label}:debug:${filePath}`)
  const logError = debugLib(`${label}:error:${filePath}*`)
  const print = debugLib(`${label}:${filePath}*`)

  return { debug, logError, print }
}
