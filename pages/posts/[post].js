import {useRouter} from 'next/router'
import Layout from '../../components/Layout';

const Post = () =>{
    const router = useRouter();
    const postId = router.query.id;
    const title = 'タイトル'
    const author = '著者'
    const imgAndTexts = [{image:'../../static/images/tizu.png', text:'地図の画像'},
                        {image:'../../static/images/train.png', text:'サンプル画像'}]
    // TODO:ここにpostidから各投稿内容を持ってくる処理を書く

    function drawImgAndText(image,text,isReverse=false){
        console.log('draimgandtext')
        if(isReverse){    
            return(
                <div>
                    <img src={image}/>
                    <h1>
                        {text}
                    </h1>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>
                        {text}
                    </h1>
                    <img src={image}/>
                </div>
            )
        }
    }

    return(
        <Layout>
            <div>
                <h1>{title}</h1>
                <h2>{author}</h2>
                {imgAndTexts.map((value,index)=>drawImgAndText(value.image,value.text,index%2 === 0))}
            </div>
        </Layout>
    )
}

export default Post;