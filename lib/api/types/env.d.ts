declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string,
            REVALIDATION_SECRET: string,
            SESSION_EXP_MS: string,
            CSRF_BYTES: string,
            SESSION_BYTES: string,
            EMAIL: string,
            EMAIL_PASSWORD: string,
            RESET_PSW_EXP_MS: string,
            NEXT_PUBLIC_MIN_USERNAME: string,
            NEXT_PUBLIC_MAX_USERNAME: string,
            NEXT_PUBLIC_MIN_PASSWORD: string,
            NEXT_PUBLIC_MAX_PASSWORD: string,
            NEXT_PUBLIC_GOOGLE_LOGIN_API: string,
            NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
        }
    }
}


export {};