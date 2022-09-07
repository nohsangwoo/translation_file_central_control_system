import { Search, Filter, Delete } from '@mui/icons-material'

// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@mui/material'
import { MouseEvent, MouseEventHandler } from 'react'
import { useSetClientState } from 'Hooks/useSetClientState'
import { useClientValue } from 'Hooks/useClientValue'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}))

const SearchStyle = styled(OutlinedInput)(({ theme }: any) => ({
  width: 300,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 340 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))

// ----------------------------------------------------------------------

interface Props {
  // numSelected: number
  filterName: string
  onFilterName: (value: string) => void
  registKind: string
  handleRegist: () => void
}

export default function CompanyToolbar({
  // numSelected,
  filterName,
  onFilterName,
  registKind,
  handleRegist,
}: Props) {
  // snackbar 사용법
  const setClientState = useSetClientState(['snackbarOpen'])
  const snackbarOpen = useClientValue(['snackbarOpen'], {
    open: false,
    msg: '',
    value: 'info',
  })

  const handleClick = () =>
    setClientState({
      open: true,
      msg: '정상처리 되었습니다.',
      value: 'success',
    })

  const handleClick2 = () =>
    setClientState({
      open: true,
      msg: '처리가 실패하였습니다.',
      value: 'error',
    })

  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        // @ts-ignore
        onChange={onFilterName}
        placeholder="검색할 회사이름을 입력하세요."
        className="searchCompany"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />

      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleRegist}
        className="addCompanyBtn"
      >
        회사 등록하기
      </Button>
    </RootStyle>
  )
}
