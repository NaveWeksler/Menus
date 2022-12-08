import { NextApiRequest } from 'next/types';

export const mockRequest = (
	method: string,
	body = {},
	cookies = {},
	query = {}
) =>
	({
		query,
		cookies,
		body,
		method,
	} as NextApiRequest);

export const mockResponse = () => {
	const status = jest.fn(),
		redirect = jest.fn(),
		send = jest.fn(),
		json = jest.fn(),
		revalidate = jest.fn(),
		setHeader = jest.fn(),
		end = jest.fn();

	const res = {
		/**
		 * Send data `any` data in response
		 */
		send: send,
		/**
		 * Send data `json` data in response
		 */
		json,
		status,
		redirect,
		revalidate,
		setHeader,
		end,
	};

	status.mockImplementation((a) => res);
	redirect.mockImplementation((a, b) => res);

	return {
		response: res,
		status,
		redirect,
		send,
		json,
		revalidate,
		end,
		setHeader,
	};
};
