import firebase from 'firebase'
import { connect } from 'react-redux';
import Link from 'next/link'

const Header = (props) => {

    function login(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log('loginしたよ')
                props.dispatch({
                    type:'UpdateUser',
                    value:{
                        page:props.page,
                        login:true,
                        user_name: result.user.displayName,
                        email: result.user.email,
                    }
                });
            })
    }

    function logout(){
        console.log('logout')
        firebase.auth().signOut();
        props.dispatch({
            type:'UpdateUser',
            value:{
                page:'TopPage',
                login:false,
                user_name:'no login',
                email: '',
            }
        })
    }

    function loginOrMypage(){
        if (props.login === true){
            return(
                <div className="text-sm lg:flex-grow">
                    <Link href='/mypage'>
                        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer">
                            {props.user_name}さんのマイページ
                        </div>               
                    </Link>
                    <Link href='/'>
                        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer"
                        onClick={()=>logout()}>
                            ログアウト
                        </div>   
                    </Link>
                </div>
            )
        }else{
            return(
                <div className="text-sm lg:flex-grow">
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer"
                    onClick={()=>login()}>
                        ログイン
                    </div>               
                </div>
            )
        }
    }

    return(
        <header>
            <nav className="flex items-center justify-between flex-wrap p-6 bg-black bg-opacity-75">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <>  
                    <Link href='/'>
                        <a className="font-semibold text-xl tracking-tight">
                            お手軽Journey
                        </a>
                    </Link>
                </>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                {loginOrMypage()}
                </div>
            </div>
            </nav>
        </header>
    )
}

export default connect((state) => state)(Header);