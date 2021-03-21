import firebase from 'firebase'
import { connect } from 'react-redux';
import Link from 'next/link'
import Lib from '../static/library'
import Router from 'next/router'

const Header = (props) => {

    const login = () => {
        // Googleを利用した認証
        let provider = new firebase.auth.GoogleAuthProvider();
        const db = firebase.database()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // emailが既に存在＝ユーザー名を既に定義している
                db.ref('user/'+Lib.encodeEmail(result.user.email)).on('value',(snapshot) => {
                    if(snapshot.exists()){
                        props.dispatch({
                            type:'UpdateUser',
                            value:{
                                login:true,
                                user_name: snapshot.val().username,
                                email: Lib.encodeEmail(result.user.email),
                            }
                        })
                    }
                    else{
                        props.dispatch({
                            type:'UpdateUser',
                            value:{
                                login:true,
                                user_name: '',
                                email: Lib.encodeEmail(result.user.email)
                            }
                        })
                        Router.push('/pushUsername')
                    }
                })
            })
    }

    const logout = () => {
        firebase.auth().signOut();
        props.dispatch({
            type:'UpdateUser',
            value:{
                login: false,
                user_name: '',
                email: '',
            }
        })
    }

    const loginOrMypage = () => {
        if (props.login === true){
            return(
                <div className="text-sm lg:flex-grow">
                    {/* userNameが定義されていない場合記入を求める */}
                    {props.user_name === "" ?
                    <Link href='/pushUsername'>
                        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer">
                            ここからユーザー名を設定してください
                        </div>  
                    </Link>
                    :
                    
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 cursor-pointer"
                        onClick={()=>location.replace('/userPage/'+props.user_name)}>
                            {props.user_name}さんの投稿一覧
                    </div>               
                    
                    }
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