import firebase from 'firebase'
import { connect } from 'react-redux';
import Link from 'next/link'
import Lib from '../lib/library'

const Header = (props) => {

    function login(){
        // Googleを利用した認証
        let provider = new firebase.auth.GoogleAuthProvider();
        const db = firebase.database()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log('loginしたよ')
                db.ref('/user').on('value',(snapshot)=>{

                })
                props.dispatch({
                    type:'UpdateUser',
                    value:{
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
                login:false,
                user_name:'',
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
                    <Link href='/submit'>
                        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer">
                            投稿
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