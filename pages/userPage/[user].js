import React, {useState, useEffect} from 'react'
import Router, {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import firebase from 'firebase'
import 'firebase/storage'
import { connect } from 'react-redux';

const UserPage = (props) => {
    const router = useRouter()
    const user_name = router.query.user
    const [posts, setPosts] =  useState([])
    const [modalIsOpen, setModalIsOpen] = useState([])
    const [deleteCnt, setDeleteCnt] = useState(0)

    //ユーザの投稿番号を取得
    useEffect(()=>{
        const db = firebase.database()
        let ref = db.ref('/user2/'+user_name+'/posts')
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
                    <button onClick={()=>{deleteFireData(post_id); location.reload()}}><p className='text-red-500'>削除</p></button> <br />
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
        db.ref('posts/'+post_id).on('value', (snapshot)=>{
            //postsテーブルのデータから都道府県を取得
            if (snapshot.val()) {
                let prefecture = snapshot.val().prefecture
                //prefectureテーブルからデータを削除
                db.ref('prefecture/'+prefecture+'/'+post_id).remove()
            }

            //postsテーブルからデータを削除
            db.ref('posts/'+post_id).remove()
        })
        
        //userテーブルからデータを削除
        db.ref('user/'+props.email+'/posts/'+post_id).remove()
        //user2テーブルからデータを削除
        db.ref('user2/'+user_name+'/posts/'+post_id).remove()
        //再レンダリングのため
        setDeleteCnt(deleteCnt+1)
    }

    return(
        <>
            <Layout>
            <h1 className="mx-10 my-10 text-center text-2xl md:text-4xl border-b border-black">{user_name}さんの投稿一覧</h1>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((value, index)=>
                        <div key={value}>
                            <PostCard postId={value}/>
                            {user_name==props.user_name ? 
                            <div className='delete-button'>
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded' onClick={()=>{openModal(index)}}>削除</button>
                            </div> : null}
                            {modalIsOpen[index] ? Modal(index, value) : null}
                        </div>)
                    }
                </div>
            </Layout>
        </>
    )
}

export default connect((state)=>state)(UserPage);