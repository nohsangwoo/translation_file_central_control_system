import { filter } from 'lodash'

export const applySortFilter = (
  array: any[],
  comparator: any,
  query: any,
  langList: string[],
) => {
  const stabilizedThis = array.map((el: any, index) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user: any) => {
      const searchKey =
        _user.key.toLowerCase().indexOf(query.toLowerCase()) !== -1

      // const searchValue =
      //   _user.value.toLowerCase().indexOf(query.toLowerCase()) !== -1
      let condition: any

      let result = searchKey

      langList.forEach(lang => {
        result =
          result ||
          _user?.[lang]?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })

      const condition1 = _user?.ko?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      const condition2 = _user?.en?.toLowerCase().indexOf(query.toLowerCase()) !== -1

      // const sumWithInitial = langList.reduce((previousValue, currentValue) => {

      //   return previousValue || _user?.[currentValue]?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // }, searchKey)

      return result
    })
  }
  return stabilizedThis.map((el: any) => el[0])
}

export const descendingComparator = (a: any, b: any, orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export const getComparator = (order: string, orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}
