import style from "styles/errorPage.module.css";
import Link from 'next/link'

const PageNotFound = () => (
    <div className={`${style.marginText} fullscreen d-flex justify-content-center align-items-center`}>
        
        <h2 className=""><strong>404</strong> Not Found</h2>
        
        <hr className="border-2 w-25"/>
        <span className="lead">
            Sorry, This Page Does Not Exsist. <Link href="/"><a className="">Go To Main Menu</a></Link>
        </span>
    </div>
);

export default PageNotFound;