import { filter } from 'lodash'

export const applySortFilter = (array: any[], comparator: any, query: any) => {
  console.log('array: ', array)
  // const stabilizedThis = array.map((el: any, index) => [el, index])
  const stabilizedThis = array.map((el: any, index) => [el, index])

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user: any) => {
      console.log('_user: ', _user)
      return _user.value.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
