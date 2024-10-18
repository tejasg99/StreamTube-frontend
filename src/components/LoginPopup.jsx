import React from 'react';
import { FiX } from "react-icons/fi";
import { LoginForm } from "./index.js";
import { useDispatch } from 'react-redux';
import { setUser } from "../features/authSlice.js"

function LoginPopup({onClose, loginTo}) {
    const dispatch = useDispatch();

    // To update redux state after successful login
    const onLogin = (session) => { 
        dispatch(setUser(session))
    }

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-slate-950 bg-opacity-75 z-50'>
        <div className='bg-black border border-slate-400 rounded-lg p-8 text-white w-full max-w-md relative'>
            <button
                onClick={onClose}
                className='absolute top-4 right-3 bg-black text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors'
                aria-label="Close"
            >
                <FiX size={20} />
            </button>
            <div className='flex flex-col gap-4 items-center mb-6'>
                <h2 className='text-xl font-semibold'>
                    Login to {loginTo || "Continue"}
                </h2>
            </div>

            <LoginForm onLogin={onLogin}/>

            <div className='mt-4 text-center'>
                <p className='text-sm text-gray-400'>
                    Don&apos;t have an account? {" "}
                    <a href="/signup" className='text-blue-400 hover:text-blue-300'>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default LoginPopup;