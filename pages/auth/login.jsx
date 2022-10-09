// const Login = () => {
//     return (
//         <div className='w-full h-full flex items-center justify-center'>
//             <form className='bg-slate-50 shadow-md rounded w-[30%] h-[60%] px-9 pt-8 pb-10 mb-20 flex flex-col items-center'>
//                 <h1 className='w-full text-center mb-10 text-xl font-semibold'>
//                     Login With
//                 </h1>
//                 <div className='mt-5 flex flex-row items-center justify-evenly w-full'>
//                     <button>Google</button>
//                     <button>Other</button>
//                 </div>
//                 <hr className='divide-y w-full my-10' />
//                 <div className='mb-4'>
//                     <label
//                         className='block text-gray-700 text-sm font-bold mb-2'
//                         htmlFor='username'
//                     >
//                         Username
//                     </label>
//                     <input
//                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                         id='username'
//                         type='text'
//                         required
//                         minLength={process.env.NEXT_PUBLIC_MIN_USERNAME}
//                         maxLength={process.env.NEXT_PUBLIC_MAX_USERNAME}
//                         placeholder='Username'
//                     />
//                 </div>
//                 <div className='mb-6'>
//                     <label
//                         className='block text-gray-700 text-sm font-bold mb-2'
//                         htmlFor='password'
//                     >
//                         Password
//                     </label>
//                     <input
//                         className='shadow appearance-none border rounded w-full py-2
//                     px-3 text-gray-700 mb-3 leading-tight focus:outline-none
//                     focus:shadow-outline'
//                         id='password'
//                         type='password'
//                         placeholder='Passowrd'
//                         required
//                         minLength={process.env.NEXT_PUBLIC_MIN_PASSWORD}
//                         maxLength={process.env.NEXT_PUBLIC_MAX_PASSWORD}
//                     />
//                 </div>
//                 <div className='flex items-center justify-between'>
//                     <button
//                         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'
//                         type='submit'
//                     >
//                         Sign In
//                     </button>
//                     <a
//                         className='inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-700 ml-5'
//                         href='#'
//                     >
//                         Dont Have An Account?
//                     </a>
//                 </div>
//             </form>
//         </div>
//     );
// };

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-700'>
            <div className='px-8 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-600 text-right'>
                <h2 className='text-xl text-center font-semibold'>כניסה</h2>
                <form
                    className='mt-8'
                    action='/api/auth/login/accountLogin'
                    method='post'
                >
                    <div className=''>
                        <label className='block text-sm m-1' htmlFor='email'>
                            מייל
                        </label>
                        <input
                            name='email'
                            type='text'
                            placeholder='כתובת מייל'
                            className='w-full p-2 border bg-inherit text-right text-xs rounded-md dark:border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block text-sm m-1' htmlFor='email'>
                            סיסמה
                        </label>
                        <input
                            name='password'
                            type='password'
                            placeholder='סיסמה'
                            className='w-full p-2 border bg-inherit text-right text-xs rounded-md dark:border-gray-500  focus:ring-1 focus:ring-blue-600'
                        />
                    </div>

                    <div className='flex flex-row-reverse items-baseline justify-between mt-12'>
                        <button className='px-6 py-2 ml-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition'>
                            כניסה
                        </button>
                        <a
                            href='#'
                            className='text-sm text-blue-600 dark:text-blue-500 hover:underline'
                        >
                            ?שכחת סיסמה
                        </a>
                    </div>
                </form>

                <div className='w-full height-8 border-b text-center my-4 leading-[0.1em] dark:border-gray-500'>
                    <span className='bg-white dark:bg-gray-800 px-2 text-gray-600 dark:text-gray-400'>
                        או
                    </span>
                </div>

                <div className='flex flex-row-reverse items-center justify-evenly'>
                    <p className='text-gray-600 text-sm dark:text-gray-300'>
                        :היכנס עם
                    </p>
                    <Link href='#'>
                        <a className='mx-2 p-1 bg-gray-200 rounded-full dark:bg-gray-600'>
                            <FcGoogle size={20} />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
