import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
	'1065217611480-05b870plne05lb6c3bnhjdnkqa4h88ga.apps.googleusercontent.com'
);
export default async function verify(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	// const payload = ticket.getPayload();
	// const userid = payload['sub'];
	return ticket.getPayload();
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}
