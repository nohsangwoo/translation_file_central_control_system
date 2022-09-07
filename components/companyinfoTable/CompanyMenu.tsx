import { useRef, useState } from 'react'
import NextLink from 'next/link'
import {
  Edit,
  MoreVert,
  Delete,
  Refresh,
  AddToQueue,
} from '@mui/icons-material'

import { People, PersonAdd, Person, Domain } from '@mui/icons-material'

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'

// ----------------------------------------------------------------------

interface Props {
  dbname: string
  path: string
  companyno: string
}
export default function CompanyMenu({ dbname, path, companyno }: Props) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const items = [
    {
      href: {
        pathname: '/usersInfo',
        query: { dbname, path },
      },
      icon: <Person fontSize="small" />,
      title: '이용자 정보보기',
    },
    {
      href: {
        pathname: '/addUsers',
        query: { dbname, path },
      },
      icon: <PersonAdd fontSize="small" />,
      title: '이용자 추가하기',
    },
    {
      href: {
        pathname: '/crudDept',
        query: { dbname, path },
      },
      icon: <PersonAdd fontSize="small" />,
      title: '부서 편집',
    },
    {
      href: {
        pathname: '/resetLoginFailCnt',
        query: { dbname, path },
      },
      icon: <Refresh fontSize="small" />,
      title: '이용자 로그인 초기화',
    },
    {
      href: {
        pathname: '/addIP',
        query: { dbname, path, companyno },
      },
      icon: <AddToQueue fontSize="small" />,
      title: 'IP 추가하기',
    },
    {
      href: {
        pathname: '/updateCompany',
        query: { dbname, path, companyno },
      },
      icon: <Edit fontSize="small" />,
      title: '회사 편집하기',
    },
    {
      href: {
        pathname: '/dropDatabse',
        query: { dbname, path, companyno },
      },
      icon: <Delete fontSize="small" />,
      title: '삭제하기',
    },
  ]

  return (
    <>
      <IconButton sx={{ p: 0 }} ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVert width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map(({ href, icon, title }, index) => {
          return (
            <NextLink href={href} key={index}>
              <MenuItem sx={{ color: 'text.secondary' }} component="a">
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </MenuItem>
            </NextLink>
          )
        })}
      </Menu>
    </>
  )
}
