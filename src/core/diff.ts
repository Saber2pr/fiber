/*
 * @Author: saber2pr
 * @Date: 2019-06-10 11:13:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-10 13:54:13
 */
// for memo deps
export const diff = <T>(a: T[], b: T[]) => {
  let i = a.length > b.length ? a.length : b.length

  while (i--) if (a[i] !== b[i]) return false

  return true
}
