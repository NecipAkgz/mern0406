import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authslice'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = 'Employee'

  // If there is a valid token present, the code decodes it using jwtDecode and extracts relevant data into variables for username and roles.
  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    // The user's roles are checked and their status is updated depending on whether they are Manager or Admin.
    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isManager) status = 'Manager'
    if (isAdmin) status = 'Admin'

    // An object containing user information is returned, including username, roles, status, isManager, and isAdmin.
    return { username, roles, status, isManager, isAdmin }
  }

  // If there is no valid token present, an empty object is returned with only values for isManager and isAdmin being defined as false.
  return { username: '', roles: [], isManager, isAdmin, status }
}

export default useAuth
