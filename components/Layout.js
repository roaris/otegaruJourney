import Header from './Header'
import Head from 'next/head'

const Layout = (props) => {
    return(
        <div>
            <Head>
                <title>{props.title}</title>
                <meta charSet='utf-8'/>            
            </Head>
            <Header/>
            {props.children}
        </div>
    )
}

export default Layout;