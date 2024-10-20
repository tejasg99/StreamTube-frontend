import { Link, useNavigate } from 'react-router-dom';
import { Logo, LoginForm} from "../components/index.js";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (session) => {
        dispatch(setUser(session));
        navigate("/");
    }

  return (
    <div className='h-screen overflow-y-auto bg-[#131313] text-white flex justify-center items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]'>
        <div className='mx-auto my-8 flex w-full max-w-sm flex-col p-4 border border-slate-500 rounded-lg'>
            <div className='w-full flex justify-center items-center'>
                <Logo 
                className={" w-full text-center text-2xl font-semibold"}
                inline={true}
                />
            </div>
            <div className='w-full flex flex-col items-center justify-center mb-6'>
                <h1 className='text-2xl text-[#FFFFFF] text-extrabold'>LOGIN</h1>
                <span className='text-[#FFFFFF] '>
                    Do not have an account? {" "}
                    <Link to="/signup" className='text-blue-500 inline'>
                        Signup
                    </Link>
                </span>
            </div>
            <LoginForm onLogin={onLogin}/>
        </div>
    </div>
  )
}

export default Login;