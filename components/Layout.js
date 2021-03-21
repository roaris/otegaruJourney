import Header from './Header'
import Head from 'next/head'

const Layout = (props) => {
    return(
        <div>
            <Head>
                <title>お手軽Journey</title>
                <meta charSet='utf-8'/>            
            </Head>
            <Header/>
            {props.children}
        </div>
    )
}

export default Layout;