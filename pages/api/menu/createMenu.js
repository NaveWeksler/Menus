import withAuth from 'lib/util/auth';

const createMenu = withAuth(1, (req, res) => {
    const { title, items } = req.body; // title is [{name: string, price: string, image: }]
});

export default createMenu;
