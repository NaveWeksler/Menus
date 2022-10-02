const Login = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form className='bg-slate-50 shadow-md rounded w-[30%] h-[60%] px-9 pt-8 pb-10 mb-20 flex flex-col items-center'>
                <h1 className='w-full text-center font-light mb-10 text-xl font-semibold'>
                    Login With
                </h1>
                <div className='mt-5 flex flex-row items-center justify-evenly w-full'>
                    <button>Google</button>
                    <button>Other</button>
                </div>
                <hr className='divide-y w-full my-10' />
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='username'
                    >
                        Username
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='username'
                        type='text'
                        required
                        minLength={process.env.NEXT_PUBLIC_MIN_USERNAME}
                        maxLength={process.env.NEXT_PUBLIC_MAX_USERNAME}
                        placeholder='Username'
                    />
                </div>
                <div className='mb-6'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='password'
                    >
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2
                    px-3 text-gray-700 mb-3 leading-tight focus:outline-none
                    focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='Passowrd'
                        required
                        minLength={process.env.NEXT_PUBLIC_MIN_PASSWORD}
                        maxLength={process.env.NEXT_PUBLIC_MAX_PASSWORD}
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Sign In
                    </button>
                    <a
                        className='inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-700 ml-5'
                        href='#'
                    >
                        Dont Have An Account?
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Login;
