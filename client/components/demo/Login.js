const Login = () => {
  let username, password
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()

        username.value = ''
        password.value = ''
      }}>
        <input ref={node => {
          username = node
        }} />
        <br/>
        <input ref={node => {
          password = node
        }} />
        <br/>
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
ReactDOM.render(
  <Login />,
  document.getElementById('root')
)
