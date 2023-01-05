import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setToken } from "./authSlice";

const AuthField: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.auth.token);
  const onChange = (event: any) => {
    dispatch(setToken(String(event.target.value)));
  }

  return (
    <>
    <h3>Bearer Token</h3>
      <input 
        type="text" 
        value={query}
        onChange = {onChange}
      />
    </>
  )
}

export default AuthField