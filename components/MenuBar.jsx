import {AiOutlineHome} from "react-icons/ai";
import {IoMdSettings} from "react-icons/io";
import Link from "next/link";

const MenuBar = () => (
    <div className="container-fluid d-flex flex-row align-items-center justify-content-end my-3">
        <Link href="/settings">
        <a className="mx-2 py-2 btn btn-light rounded-3" style={{width: "3rem", height: "3rem"}}>
            <IoMdSettings size={20} color="black" className="p-0 m-0"/>
        </a>
        </Link>
        <Link href="/"><a className="mx-2 py-2 btn btn-light rounded-3" style={{width: "3rem", height: "3rem"}}>
            <AiOutlineHome size={20} color="black" className="p-0 m-0"/>
        </a></Link>
    </div>
);

export default MenuBar;
