import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import fetcher from 'lib/frontend/fetcher';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (
                event.currentTarget.elements.namedItem(
                    'email'
                ) as HTMLInputElement
            ).value,
            password = (
                event.currentTarget.elements.namedItem(
                    'password'
                ) as HTMLInputElement
            ).value;
        console.log('login: ', email, password);
        const { status } = await fetcher.post('/api/auth/login/accountLogin', {
            body: { email, password },
        });
        if (status === 200) {
            router.push('/');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-700'>
            <div className='px-8 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-600 text-right'>
                <h2 className='text-xl text-center font-semibold'>כניסה</h2>
                <form className='mt-8' onSubmit={handleLogin}>
                    <div className=''>
                        <label className='block text-sm m-1' htmlFor='email'>
                            מייל
                        </label>
                        <input
                            name='email'
                            autoComplete='username'
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
                            autoComplete='current-password'
                            placeholder='סיסמה'
                            className='w-full p-2 border bg-inherit text-right text-xs rounded-md dark:border-gray-500  focus:ring-1 focus:ring-blue-600'
                        />
                    </div>

                    <div className='w-full height-8 border-b text-center mb-4 mt-8 leading-[0.1em] dark:border-gray-500'>
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

                    <div className='flex flex-row-reverse items-baseline justify-between mt-4'>
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
            </div>
        </div>
    );
};

export default Login;
