import { useEffect, useState } from "react";
import firebase from 'firebase'
import Link from 'next/link'

const PostCard = (props) => {
    const [imgSrc, setImgSrc] = useState("../static/images/tizu.png")
    const [title, setTitle] = useState("デフォルトタイトル")
    const [author, setAuthor] = useState("デフォルト著者")
    const [email, setEmail] = useState("#")
    const postId = props.postId
    const db = firebase.database()

    useEffect(()=>{
        const postRef = db.ref('posts/'+postId)
        postRef.on('value',(snapshot)=>{
            if(snapshot.val() === null) return
            setTitle(snapshot.val().title)
            setAuthor(snapshot.val().user_name)
            firebase.storage().ref(snapshot.val().img[0]).getDownloadURL().then((url)=>{
                setImgSrc(url);
            })
        })
    },[])

    return(
        <div className='w-80 mx-10 my-5'>
            <article className="overflow-hidden rounded-lg shadow-lg">

                <Link href={"/posts/"+postId}>
                    <a>
                        <img alt="Placeholder" className="block h-64 w-full" src={imgSrc} style={{objectFit:"contain"}}/>
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

                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                        <a className="flex items-center no-underline hover:underline text-black" href="#">
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