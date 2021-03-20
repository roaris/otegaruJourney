import Layout from "../components/Layout";
import firebase from "firebase"
import { connect } from 'react-redux'
import { useEffect, useState } from "react";
import Router from 'next/router'

const pushUserName = (props) =>{
    const [userName, setUserName] = useState('')
    const [isExist, setIsExist] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const db = firebase.database()
    const ref = db.ref('user2')

    function check(){
        setIsExist(false)
        setIsCheck(false)
        if(userName === ''){
            alert('空列はユーザー名に使用できません')
            return
        }

        ref.child(userName).on('value',(snapshot)=>{
            if(snapshot.val() === null){
                setIsCheck(true)
            }else{
                setIsExist(true)
            }
            // const entries = Object.entries(snapshot.val())
            // let flag = false
            // entries.map((entry)=>{
            //     if(entry[1]['username'] === userName){
            //         setIsExist(true)
            //         flag=true
            //     }
            // })
            // if(flag===false){
            //     setIsCheck(true)
            // }
        })
    }

    function submit(){
        ref.child(userName).set({username:userName})
        db.ref('user/'+props.email).set({username:userName})
        props.dispatch({
            type:'UpdateName',
            value:{
                login: props.login,
                user_name: userName,
                email: props.email,
            }
        })
        alert('登録できました！')
        Router.push('/')
    }

    return(
        <Layout>
            {props.login === false ?
            <h1>まずログインしてください</h1>
            :
            props.user_name === '' ?
            (   
                <div className="container mx-auto md:text-3xl justify-center items-center">
                    <h1 className="my-5 text-center md:text-6xl border-b border-black">ここはユーザー名設定ページです</h1>
                    <div className="mx-auto">
                    <h2>以下の3点に注意してください</h2>
                    <ul>
                        <li>・他のユーザ名と同じものは設定できません</li>
                        <li>・他のユーザからも見えるものなので個人情報の分かる名前などに設定しないようにお願いします</li>
                        <li>・一度設定すると変更できません</li>
                    </ul> 
                    <div className="my-5">
                        ユーザ名を入力：<input placeholder='ユーザー名' className='p-1 border' type='text' value={userName} 
                        onChange={(e)=>{setUserName(e.target.value);setIsCheck(false)}}/>
                        {isCheck ?
                        <button id="btn-name" type="button" className='ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded'
                        onClick={()=>submit()}>かぶりなし！ここから設定</button>
                        :
                        <button id="btn-name" type="button" className='ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded'
                            onClick={()=>check()}>ユーザー名のかぶりをチェック</button>
                        }
                        
                        {isExist && <h1 className="text-red-600">このユーザー名は既に存在しています</h1>}
                    </div>
                    </div>
                </div>       
            )
            :
            <h1>既にユーザー名を設定した人は設定する必要はありません</h1>
            }


        </Layout>
    )
}

export default connect((state)=>state)(pushUserName);