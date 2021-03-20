import Layout from "../../components/Layout";
import { useRouter } from 'next/router'
import PostCard from '../../components/PostCard'
import firebase from 'firebase'
import { useEffect, useState } from "react";
import { urlObjectKeys } from "next/dist/next-server/lib/utils";


const Prefecture = () => {
    const idToName = {1: "北海道",2: "青森県",3: "岩手県",4: "宮城県",5: "秋田県",6: "山形県",7: "福島県",8: "茨城県",9: "栃木県",10: "群馬県",11: "埼玉県",12: "千葉県",13: "東京都",14: "神奈川県",15: "新潟県",16: "富山県",17: "石川県",18: "福井県",19: "山梨県",20: "長野県",21: "岐阜県",22: "静岡県",23: "愛知県",24: "三重県",25: "滋賀県",26: "京都府",27: "大阪府",28: "兵庫県",29: "奈良県",30: "和歌山県",31: "鳥取県",32: "島根県",33: "岡山県",34: "広島県",35: "山口県",36: "徳島県",37: "香川県",38: "愛媛県",39: "高知県",40: "福岡県",41: "佐賀県",42: "長崎県",43: "熊本県",44: "大分県",45: "宮崎県",46: "鹿児島県",47: "沖縄県"}
    let router = useRouter()
    const prefectureId = router.query.prefecture 
    const db = firebase.database()
    const [idList,setIdList] = useState([])

    // 受け取った都道府県の投稿を探す
    useEffect(()=>{
        let prefectureRef = db.ref('prefecture/'+prefectureId)
        prefectureRef.orderByKey().on('value',(snapshot)=>{
            let postIds = []
            const posts = snapshot.val()
            if(posts === null) return
            const entries = Object.entries(posts)
            entries.map((post)=>{
                //postIds.unshift(String(post[0]))
                postIds.push(String(post[0]))
            })
            setIdList(postIds)
        })
    },[])

    return(
        <Layout>
            <div>
                <h1 className="mx-10 my-10 text-center text-2xl md:text-4xl border-b border-black">{idToName[prefectureId]}の投稿一覧</h1>
                <div className="flex flex-wrap justify-center">
                    {idList.map((id)=>
                        <div key={id}>
                            <PostCard postId={id}/>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Prefecture;