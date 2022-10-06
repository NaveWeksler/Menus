const EditMenuItem = () => {
    return (
        <div className='border rounded w-full py-5 flex items-center justify-between px-2'>
            <input placeholder='name' type='text' />
            <input placeholder='description' type='text' />
            <input placeholder='image' type='file' />
        </div>
    );
};

export default EditMenuItem;
