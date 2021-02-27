import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav';

export default function Layout({children, pageTitle}){
    return(
        <div>
            <Head>
                <title>{pageTitle ? pageTitle : "Home"}</title>
            </Head>
            <div>
                <Nav />
                {children}
            </div>
        </div>
    )
}