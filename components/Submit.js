import React, {useState} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import firebase from 'firebase'
import 'firebase/storage'
import Router from 'next/router'
import Layout from './Layout.js'

const SubmitPage = (props) => {
    const [title, setTitle] = useState('') //タイトル
    const [prefecture, setPrefecture] = useState(-1) //都道府県
    //画像、ビュー、説明文を一括で管理
    const [imgViewSentences, setImgViewSentences] = useState([
        {id:0, img:null, view:null, sentence:''}
    ])
    const [lastID, setLastID] = useState(-1) //最後のレコード番号

    const options = [
        {value:'1', label:'北海道'},
        {value:'2', label:'青森県'},
        {value:'3', label:'岩手県'},
        {value:'4', label:'宮城県'},
        {value:'5', label:'秋田県'},
        {value:'6', label:'山形県'},
        {value:'7', label:'福島県'},
        {value:'8', label:'茨城県'},
        {value:'9', label:'栃木県'},
        {value:'10', label:'群馬県'},
        {value:'11', label:'埼玉県'},
        {value:'12', label:'千葉県'},
        {value:'13', label:'東京都'},
        {value:'14', label:'神奈川県'},
        {value:'15', label:'新潟県'},
        {value:'16', label:'富山県'},
        {value:'17', label:'石川県‎'},
        {value:'18', label:'福井県‎'},
        {value:'19', label:'山梨県‎'},
        {value:'20', label:'長野県‎'},
        {value:'21', label:'岐阜県'},
        {value:'22', label:'静岡県'},
        {value:'23', label:'愛知県‎'},
        {value:'24', label:'三重県'},
        {value:'25', label:'滋賀県'},
        {value:'26', label:'京都府'},
        {value:'27', label:'大阪府'},
        {value:'28', label:'兵庫県'},
        {value:'29', label:'奈良県'},
        {value:'30', label:'和歌山県'},
        {value:'31', label:'鳥取県'},
        {value:'32', label:'島根県'},
        {value:'33', label:'岡山県'},
        {value:'34', label:'広島県'},
        {value:'35', label:'山口県'},
        {value:'36', label:'徳島県'},
        {value:'37', label:'香川県'},
        {value:'38', label:'愛媛県'},
        {value:'39', label:'高知県'},
        {value:'40', label:'福岡県'},
        {value:'41', label:'佐賀県'},
        {value:'42', label:'長崎県'},
        {value:'43', label:'熊本県'},
        {value:'44', label:'大分県'},
        {value:'45', label:'宮崎県'},
        {value:'46', label:'鹿児島県'},
        {value:'47', label:'沖縄県'}
    ]

    //行を追加
    const add = () => {
        //5枚まで
        if (imgViewSentences.length==5) {
            alert('投稿できるのは画像5枚までです')
            return
        }
        
        let newImgViewSentences = imgViewSentences.slice()
        newImgViewSentences.push({
            id:imgViewSentences.length, img:null, view:null, sentence:''
        })
        setImgViewSentences(newImgViewSentences)
    }

    //行を削除
    const remove = (index) => {
        //行の数が既に1なら削除しない
        if (imgViewSentences.length==1) return
        
        let newImgViewSentences = imgViewSentences.slice()
        newImgViewSentences.splice(index, 1)
        setImgViewSentences(newImgViewSentences)
    }

    //画像の変更
    const changeImgs = (index, e) => {
        if (e.target.files.length>0) {
            let newImgViewSentences = imgViewSentences.slice()
            newImgViewSentences[index].img = e.target.files[0]
            setImgViewSentences(newImgViewSentences)
        }
    }

    //ビューの変更
    const changeImgViews = (index, e) => {
        if (e.target.files.length>0) {
            let reader = new FileReader()
            let file = e.target.files[0]
            reader.onloadend = () => {
                let newImgViewSentences = imgViewSentences.slice()
                newImgViewSentences[index].view = reader.result
                setImgViewSentences(newImgViewSentences)
            }
            reader.readAsDataURL(file)
        }
    }

    //説明文の変更
    const changeText = (index, e) => {
        let newImgViewSentences = imgViewSentences.slice()
        newImgViewSentences[index].sentence = e.target.value
        setImgViewSentences(newImgViewSentences)
    }

    //最後のレコード番号を取得
    const getLastID = () => {
        let db = firebase.database()
        let ref = db.ref('posts/')
        ref.orderByKey().limitToLast(1).on('value', (snapshot)=>{
            let res = snapshot.val()
            for (let i in res) setLastID(i)
        })
    }

    //投稿エラー処理
    const addError = () => {
        let error_message = ''
        if (title=='') error_message += '・タイトルを入力してください\n'
        if (prefecture==-1) error_message += '・都道府県を選択してください\n'
        for (let i=0; i<imgViewSentences.length; i++) {
            if (imgViewSentences[i].img==null) error_message += '・'+(i+1)+'枚目の画像を選択してください\n'
            if (imgViewSentences[i].sentence=='') error_message += '・'+(i+1)+'個目の説明文を入力してください\n'
        }
        if (error_message=='') return false
        else {
            alert(error_message)
            return true
        }
    }

    //投稿処理
    const addFireData = () => {
        //投稿エラーがある場合は投稿しない
        if (addError()) return
        let id = lastID*1+1 //投稿ID
        console.log(id)
        let db = firebase.database()
        let ref = db.ref('posts/'+id)
        //ストレージから画像を取り出すためのパスを作成
        let imgPaths = [];
        for (let i=0; i<imgViewSentences.length; i++) imgPaths.push(id+'/'+i)
        let sentences = [];
        for (let i=0; i<imgViewSentences.length; i++) sentences.push(imgViewSentences[i].sentence)
        ref.set({
            user_name: props.user_name,
            user_email: props.email.split('.').join('*'),
            title: title,
            prefecture: prefecture,
            img: imgPaths,
            sentence: sentences
        })

        //ストレージに画像を保存
        for (let i=0; i<imgViewSentences.length; i++) {
            let storageRef = firebase.storage().ref().child(id+'/'+i)
            storageRef.put(imgViewSentences[i].img)
        }
        
        //都道府県のテーブルに投稿IDを追加
        ref = db.ref('prefecture/'+prefecture)
        ref.push(id)

        //ユーザーのテーブルに投稿IDを追加
        ref = db.ref('user/'+props.email.split('.').join('*'))
        ref.push(id)

        //トップページに戻る
        alert('投稿が出来ました!')
        Router.push('/')
    }

    if (lastID==-1) getLastID()

    if (props.user_name=='') {
        return (
            <>
                <Layout>
                    <p>投稿するためにはログインしてください</p>
                </Layout>
            </>
        )
    }

    return(
        <>
            <Layout>
            <div className='submit-top'>
                <h1>投稿ページ</h1>
                <p>タイトル、都道府県、画像、説明文を入力してください。投稿できるのは5枚までです。</p>
                <p>投稿にあたって、名前は公開されません。マイページから投稿を削除することも可能です。</p>

                <div className='title-form'>
                    <input placeholder='タイトル' className='p-1 border' type='text' onChange={(e)=>setTitle(e.target.value)} />
                </div>

                <div className='select-form'>
                    <Select placeholder='都道府県' className='select' options={options} onChange={(e)=>{setPrefecture(e.value)}}/>
                </div>

                {imgViewSentences.map((value, index)=>
                    <div key={value.id} className='viewSentence-wrapper'>
                        <p className='index'>{index+1}枚目</p>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded' onClick={()=>{remove(index)}}>削除</button>
                        <div className='viewSentence'>
                            <div className='view'>
                            <input type='file' className='file-form' accept='.png, .jpg, .jpeg, .PNG, .JPG' onChange={(e)=>{changeImgs(index, e); changeImgViews(index, e)}} /> <br />
                            <img className='imgView' src={value.view} />
                            </div>
                            <textarea className='border-black p-1 border w-64' placeholder='説明文を入力してください' type='text' value={value.sentence} onChange={(e)=>{changeText(index, e)}} />
                        </div>
                    </div>
                )}

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={()=>{add()}}>追加</button>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded' onClick={()=>{addFireData()}}>投稿</button>
            </div>
            </Layout>
        </>
    )
}

export default  connect((state)=>state)(SubmitPage)