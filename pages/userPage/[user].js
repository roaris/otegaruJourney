import React, {useState, useEffect} from 'react'
import Router, {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import firebase from 'firebase'
import 'firebase/storage'

const UserPage = (props) => {
    const router = useRouter()
    const user_name = router.query.user
    const [posts, setPosts] =  useState([])
    const [modalIsOpen, setModalIsOpen] = useState([])
    const [deleteCnt, setDeleteCnt] = useState(0)
    //TODO
    //存在しないユーザのページは開けないようにする
    const f = (v) => {
        return {flag:false, modal:<Modal value={v}/>}
    }

    //ユーザの投稿番号を取得
    useEffect(()=>{
        const db = firebase.database()
        let ref = db.ref('/user/'+user_name+'/posts')
        ref.orderByKey().on('value', (snapshot)=>{
            if(snapshot.val() === null) return
            let data = [...Object.entries(snapshot.val())].map(v=>v[0])
            setPosts(data)
            let flags = Array(data.length).fill(false)
            setModalIsOpen(flags)
        })
    }, [deleteCnt])

    const Modal = (index, post_id) => {
        return (
            <div id="overlay">
                <div id="content">
                    <p>本当に削除してよろしいでしょうか?</p>
                    <button onClick={()=>{deleteFireData(post_id); closeModal(index);}}><p className='text-red-500'>削除</p></button> <br />
                    <button onClick={()=>closeModal(index)}>キャンセル</button>
                </div>
            </div>
        )
    }

    const openModal = (index) => {
        let newModalIsOpen = modalIsOpen.slice()
        newModalIsOpen[index] = true
        setModalIsOpen(newModalIsOpen)
    }

    const closeModal = (index) => {
        let newModalIsOpen = modalIsOpen.slice()
        newModalIsOpen[index] = false
        setModalIsOpen(newModalIsOpen)
    }

    const deleteFireData = (post_id) => {
        let db = firebase.database()
        console.log('delete_id', post_id)
        db.ref('posts/'+post_id).on('value', (snapshot)=>{
            //postsテーブルのデータから都道府県を取得
            if (snapshot.val()) {
                let prefecture = snapshot.val().prefecture
                console.log(prefecture)
                //prefectureテーブルからデータを削除
                db.ref('prefecture/'+prefecture+'/'+post_id).remove()
            }

            //postsテーブルからデータを削除
            db.ref('posts/'+post_id).remove()
        })
        
        //userテーブルからデータを削除
        db.ref('user/'+user_name+'/posts/'+post_id).remove()
        setDeleteCnt(deleteCnt+1)
    }
    
    const goUpdatePage = (value) => {
        Router.push('/updates/'+value)
    }

    {console.log(posts)}
    {console.log(modalIsOpen)}

    return(
        <>
            <Layout>
                <h1>{user_name}さんのマイページ</h1>
                <div className='display'>
                    {posts.map((value, index)=>
                        <div key={value}>
                            <PostCard postId={value}/>
                            {/* TODO ログイン中のユーザ以外には修正、削除ボタンを表示しないようにする */}
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded' onClick={()=>{goUpdatePage(value)}}>修正</button>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded' onClick={()=>{openModal(index)}}>削除</button>
                            {modalIsOpen[index] ? Modal(index, value) : null}
                        </div>)
                    }
                </div>
            </Layout>
        </>
    )
}

export default UserPage;