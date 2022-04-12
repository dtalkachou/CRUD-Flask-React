import { useCallback, useState } from "react"


const useRequestReducer = (fn) => {
  const [state, setState] = useState({
    isPending: false,
    error: null
  })

  const handleProcess = useCallback((onFulfilled) => {
    setState({ isPending: true, error: null })

    return fn()
      .then(({data}) => {
        setState({ isPending: false, error: null })
        onFulfilled(data)
      })
      .catch((error) => {
        setState({
          isPending: false,
          error: error.response ? error.response.data : error.message
        })
      })
  }, [fn, setState])

  return [state, handleProcess]
}

export default useRequestReducer
