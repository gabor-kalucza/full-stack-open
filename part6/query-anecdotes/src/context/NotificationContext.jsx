import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const setNotification = (message, time = 5) => {
    dispatch({ type: 'SET', payload: message })

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext)
