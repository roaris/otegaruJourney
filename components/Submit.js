import React, {useState} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import firebase from 'firebase'
import 'firebase/storage'

const SubmitPage = (props) => {
    const [title, setTitle] = useState('')
    const [prefecture, setPrefecture] = useState(-1)
    const [indexes, setIndexes] = useState([0])
    const [imgs, setImgs] = useState([''])
    const [imgViews, setImgViews] = useState([''])
    const [sentences, setSentences] = useState([''])
    const [lastID, setLastID] = useState(-1)

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

    const add = () => {
        let newIndexes = indexes.slice()
        newIndexes.push(indexes.length)
        setIndexes(newIndexes)

        let newImgs = imgs.slice()
        newImgs.push('')
        setImgs(newImgs)

        let newImgViews = imgViews.slice()
        newImgViews.push('')
        setImgViews(newImgViews)

        let newSentences = sentences.slice()
        newSentences.push('')
        setSentences(newSentences)
    }

    const remove = (index) => {
        let newIndexes = indexes.slice()
        newIndexes.splice(index, 1)
        for (let i=0; i<newIndexes.length; i++) newIndexes[i] = i
        setIndexes(newIndexes)

        let newImgs = imgs.slice()
        newImgs.splice(index, 1)
        setImgs(newImgs)

        let newImgViews = imgViews.slice()
        newImgViews.splice(index, 1)
        setImgViews(newImgViews)

        let newSentences = sentences.slice()
        newSentences.splice(index, 1)
        setSentences(newSentences)
    }

    const updateImgs = (index, e) => {
        if (e.target.files.length>0) {
            let newImgs = imgs.slice()
            newImgs[index] = e.target.files[0]
            setImgs(newImgs)
        }
    }

    const updateImgViews = (index, e) => {
        if (e.target.files.length>0) {
            let reader = new FileReader()
            let file = e.target.files[0]
            reader.onloadend = () => {
                let newImgViews = imgViews.slice()
                newImgViews[index] = reader.result
                setImgViews(newImgViews)
            }
            reader.readAsDataURL(file)
        }
    }

    const updateText = (index, e) => {
        let newSentences = sentences.slice()
        newSentences[index] = e.target.value
        setSentences(newSentences)
    }

    const getLastID = () => {
        let db = firebase.database()
        let ref = db.ref('posts/')
        let lastID
        ref.orderByKey().limitToLast(1).on('value', (snapshot)=>{
            let res = snapshot.val()
            for (let i in res) setLastID(i)
        })
    }

    const addFireData = () => {
        if (lastID==-1) return
        let id = lastID*1+1
        let db = firebase.database()
        let ref = db.ref('posts/'+id)
        let imgPaths = [];
        for (let i=0; i<imgs.length; i++) imgPaths.push(id+'/'+i)
        ref.set({
            user_name: props.user_name,
            user_email: props.email.split('.').join('*'),
            title: title,
            prefecture: prefecture,
            img: imgPaths,
            sentence: sentences
        })
        for (let i=0; i<imgs.length; i++) {
            console.log(imgs[i])
            let storageRef = firebase.storage().ref().child(id+'/'+i)
            storageRef.put(imgs[i])
        }
        
        ref = db.ref('prefecture/'+prefecture)
        ref.push(id)

        ref = db.ref('user/'+props.email.split('.').join('*'))
        ref.push(id)

    }

    if (lastID==-1) getLastID()

    return(
        <>
            <div className='top'>
                <h1>投稿ページ</h1>
                <input type='text' placeholder='タイトル' onChange={(e)=>setTitle(e.target.value)}/>
                <Select options={options} onChange={(e)=>{setPrefecture(e.value)}}/>
                {indexes.map((v)=>
                    <div>
                        <p>{v+1}枚目</p>
                        <input type='file' accept='.png, .jpg, .jpeg, .PNG, .JPG' onChange={(e)=>{updateImgs(v, e); updateImgViews(v, e)}} /> <br />
                        <img className='submitImg' src={imgViews[v]} />
                        <textarea className='submitTextarea' type='text' placeholder='説明文' value={sentences[v]} onChange={(e)=>{updateText(v, e)}} />
                        <button onClick={()=>{remove(v)}}>削除</button>
                    </div>
                )}
                <button onClick={()=>{add()}}>追加</button>
                <button onClick={()=>{addFireData()}}>投稿</button>
            </div>
        </>
    )
}

export default  connect((state)=>state)(SubmitPage)