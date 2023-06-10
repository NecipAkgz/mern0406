import PulseLoader from 'react-spinners/PulseLoader'
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from './usersApiSlice'

const NewNote = () => {
  const { users } = useGetUsersQuery('userList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <PulseLoader color={'#FFF'} />

  const content = <NewNoteForm users={users} />

  return content
}
export default NewNote
