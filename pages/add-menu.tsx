import { MdOutlineAdd } from 'react-icons/md';
import { useState } from 'react';
import EditMenuItem from 'components/EditMenuItem';
import { NextPage } from 'next';
import fetcher from 'lib/frontend/fetcher';
import { Input, Output } from 'lib/contract/createMenu';
import Link from 'next/link';

type IHandleSubmit = (event: React.FormEvent<EventTarget>) => void;

const AddMenu = () => {
	const [created, setCreated] = useState(false);
	const [id, setId] = useState('');
	const [items, setItems] = useState<JSX.Element[]>([]);
	const [error, setError] = useState(0);

	const addItem = () => {
		setItems([...items, <EditMenuItem key={items.length.toString()} />]);
	};

	const handleSubmit: IHandleSubmit = async (event) => {
		event.preventDefault();
		// console.log("handleSubmit title: ", event.target.elements);
		// fetcher.post("/api/menu/createMenu", {body: {title: event.currentTarget[0].value}})
		console.log(
			(
				(event.target as HTMLFormElement).elements.namedItem(
					'title'
				) as HTMLInputElement
			).value
		);

		const { json, status } = await fetcher.post<Input, Output>(
			'/api/menu/createMenu',
			{
				body: {
					title: (
						(event.target as HTMLFormElement).elements.namedItem(
							'title'
						) as HTMLInputElement
					).value,
				},
			}
		);

		if (status === 201) {
			setCreated(true);
			setId(json.id);
		} else if (status === 409) {
			setError(409);
		}
	};

	return (
		<div className='flex items-center justify-center flex-col'>
			<h6 className='my-5'>
				{created
					? "Step 2 Add Items. (You Can Do It Later In the 'EditMenu' page)"
					: 'Step 1 Create Menu'}
			</h6>
			{created ? (
				<EditMenu />
			) : (
				<CreateMenu onSubmit={handleSubmit} error={error} />
			)}
		</div>
	);
};

const CreateMenu: NextPage<{ onSubmit: IHandleSubmit; error: number }> = ({
	onSubmit,
	error,
}) => (
	<form onSubmit={onSubmit} className='flex items-center justify-evenly mx-5'>
		<div>
			<label
				htmlFor='title'
				className='inline text-gray-700 text-sm font-bold mr-5'>
				Menu title
			</label>
			<input
				type='text'
				name='title'
				className='inline shadow border appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<small>
				{error === 409 && (
					<strong>
						You Already Have a Menu With This Title. Edit it{' '}
						<Link href='edit-menu'>
							<a>Here</a>
						</Link>
					</strong>
				)}
			</small>
		</div>
		<button type='submit' className='bg-gray-100 p-2 ml-5'>
			Create
		</button>
	</form>
);

const EditMenu: NextPage = () => <div>Not Created</div>;

export default AddMenu;

/**
 * <form className='flex h-full p-2 flex-col' onSubmit={handleSubmit} action="post">
            <input
                readOnly
                value='z2xB3V96NHylff/jdvEaSQ=='
                name='csrfToken'
                className='hidden'
            />
            <div className='my-2 w-[50%] flex items-center mx-8'>
                <label
                    htmlFor='menuName'
                    className='inline text-gray-700 text-sm font-bold mr-5'
                >
                    Menu Name
                </label>
                <input
                    type='text'
                    id='menuName'
                    name='title'
                    className='inline shadow border appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>

            <div className='flex flex-col flex-1 w-full'>
                <span className='mb-3 flex items-center justify-between mx-8'>
                    <h1 className='inline block text-gray-700 text-lg font-bold mb-2'>
                        Items:
                    </h1>
                    <button
                        type='button'
                        onClick={addItem}
                        className='rounded border hover:bg-gray-200 w-8 h-8 box-border inline-block flex items-center justify-center'
                    >
                        <MdOutlineAdd color='black' size={20} />
                    </button>
                </span>
                <div className='border w-full flex-1 rounded'>{items}</div>
            </div>
            <button type='submit'>Add</button>
        </form>
 */
