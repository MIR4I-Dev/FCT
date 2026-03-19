import { useState } from 'react'
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
	Title
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import { type UserId } from '../store/users/slice'

export function ListOfUsers () {
  const users = useAppSelector((state) => state.users)
  const { removeUser, updateUser } = useUserActions()

  // Estado para controlar qué usuario se está editando y sus valores temporales
  const [editingUserId, setEditingUserId] = useState<UserId | null>(null)
  const [editValues, setEditValues] = useState({ name: '', email: '', github: '' })

  const handleEditClick = (user: typeof users[0]) => {
    setEditingUserId(user.id)
    setEditValues({ name: user.name, email: user.email, github: user.github })
  }

  const handleSaveEdit = () => {
    if (editingUserId) {
      updateUser({ id: editingUserId, ...editValues })
      setEditingUserId(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingUserId(null)
  }

  return (
    <Card>
      <Title>
        Usuarios
        <Badge style={{ marginLeft: '8px' }}>{users.length}</Badge>
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell> Id </TableHeaderCell>
            <TableHeaderCell> Nombre </TableHeaderCell>
            <TableHeaderCell> Email </TableHeaderCell>
            <TableHeaderCell> Acciones </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((item) => {
            const isEditing = editingUserId === item.id
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    style={{
										  width: '32px',
										  height: '32px',
										  borderRadius: '50%',
										  marginRight: '8px'
                    }}
                    src={`https://unavatar.io/github/${item.github}`}
                    alt={item.name}
                  />
                  {isEditing
                    ? <TextInput
                        value={editValues.name}
                        onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      />
                    : item.name
                  }
                </TableCell>
                <TableCell>
                  {isEditing
                    ? <TextInput
                        value={editValues.email}
                        onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                      />
                    : item.email
                  }
                </TableCell>
                <TableCell>
                  {isEditing
                    ? (
                      <>
                        <button onClick={handleSaveEdit} type='button' title='Guardar'>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                          </svg>
                        </button>
                        <button onClick={handleCancelEdit} type='button' title='Cancelar'>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                          </svg>
                        </button>
                      </>
                    )
                    : (
                      <>
                        <button onClick={() => handleEditClick(item)} type='button' title='Editar'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                            />
                          </svg>
                        </button>
                        <button onClick={() => removeUser(item.id)} type='button' title='Eliminar'>
                          <svg
                            aria-label='Remove element'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>
                      </>
                    )
                  }
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
