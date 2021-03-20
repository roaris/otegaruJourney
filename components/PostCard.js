import { useEffect, useState } from "react";
import firebase from 'firebase'
import Link from 'next/link'

const PostCard = (props) => {
    const idToName = {1: "北海道",2: "青森県",3: "岩手県",4: "宮城県",5: "秋田県",6: "山形県",7: "福島県",8: "茨城県",9: "栃木県",10: "群馬県",11: "埼玉県",12: "千葉県",13: "東京都",14: "神奈川県",15: "新潟県",16: "富山県",17: "石川県",18: "福井県",19: "山梨県",20: "長野県",21: "岐阜県",22: "静岡県",23: "愛知県",24: "三重県",25: "滋賀県",26: "京都府",27: "大阪府",28: "兵庫県",29: "奈良県",30: "和歌山県",31: "鳥取県",32: "島根県",33: "岡山県",34: "広島県",35: "山口県",36: "徳島県",37: "香川県",38: "愛媛県",39: "高知県",40: "福岡県",41: "佐賀県",42: "長崎県",43: "熊本県",44: "大分県",45: "宮崎県",46: "鹿児島県",47: "沖縄県"}
    const [imgSrc, setImgSrc] = useState()
    const [title, setTitle] = useState("読み込み中")
    const [prefecture, setPrefecture] = useState(-1)
    const [author, setAuthor] = useState("読み込み中")
    const postId = props.postId
    const db = firebase.database()

    useEffect(()=>{
        const postRef = db.ref('posts/'+postId)
        postRef.on('value',(snapshot)=>{
            if(snapshot.val() === null) return
            setTitle(snapshot.val().title)
            setPrefecture(snapshot.val().prefecture)
            setAuthor(snapshot.val().user_name)
            firebase.storage().ref(snapshot.val().img[0]).getDownloadURL().then((url)=>{
                setImgSrc(url);
            })
        })
    },[])

    return(
        <div className='w-80 mx-10 my-5' key={postId}>
            <article className="overflow-hidden rounded-lg shadow-lg">

                <Link href={"/posts/"+postId}>
                    <a>
                        <img alt="読み込み中" className="block h-64 w-full" src={imgSrc} style={{objectFit:"contain"}}/>
                    </a>
                </Link>

                <div className='h-40'>
                    <header className="flex-wrap items-center justify-between leading-tight p-2 md:p-4">
                        <h1 className="text-lg">
                            <Link href={"/posts/"+postId}>
                                <a className="no-underline hover:underline text-black" href="#">
                                    {title}
                                </a>
                            </Link>
                        </h1>
{/* 
                        <p className="text-grey-darker text-sm">
                            Date
                        </p> */}
                    </header>

                    <footer className="leading-none p-2 md:p-4">
                        <a className="no-underline hover:underline text-black" href="#">
                            <Link href={"/prefectures/"+prefecture}>
                                <p className="text-sm">
                                    {idToName[prefecture]}
                                </p>
                            </Link>
                            {/* <img alt="Placeholder" className="block rounded-full" src="../static/images/train.png" style={{objectFit:"contain"}}/> */}
                        </a>
                        <a className="no-underline hover:underline text-black" href="#">
                            <Link href={"/userPage/"+author}>
                                <p className="text-sm">
                                    {author}
                                </p>
                            </Link>
                            {/* <img alt="Placeholder" className="block rounded-full" src="../static/images/train.png" style={{objectFit:"contain"}}/> */}
                        </a>
                    </footer>
                </div>
            </article>
        </div>  
    )
}

export default PostCard;