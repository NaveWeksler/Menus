const EditMenuItem = () => {
	return (
		<div className='border rounded w-full py-5 flex items-center justify-between px-2'>
			<input placeholder='name' name='name' type='text' />
			<input placeholder='description' name='description' type='text' />
			<input placeholder='image' type='file' name='image' />
		</div>
	);
};

export default EditMenuItem;
