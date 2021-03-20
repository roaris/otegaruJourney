import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import firebase from 'firebase'
import 'firebase/storage'
import Slider from "react-slick"

const Post = () =>{
    const router = useRouter();
    const postId = router.query.post;
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [textImg1, setTextImg1] = useState({text:'', image:''})
    const [textImg2, setTextImg2] = useState({text:'', image:''})
    const [textImg3, setTextImg3] = useState({text:'', image:''})
    const [textImg4, setTextImg4] = useState({text:'', image:''})
    const [textImg5, setTextImg5] = useState({text:'', image:''})

    useEffect(()=>{
        const db = firebase.database()
        let ref = db.ref('/posts/'+postId)

        ref.orderByKey().on('value', (snapshot)=>{
            const data = snapshot.val()
            if(data === null) return
            setTitle(data.title)
            setAuthor(data.user_name)

            for (let i=0; i<data.img.length; i++) {
                ref = firebase.storage().ref().child(data.img[i])
                
                ref.getDownloadURL().then((url)=>{
                    if (i==0) setTextImg1({text:data.sentence[i], image:url})
                    else if (i==1) setTextImg2({text:data.sentence[i], image:url})
                    else if (i==2) setTextImg3({text:data.sentence[i], image:url})
                    else if (i==3) setTextImg4({text:data.sentence[i], image:url})
                    else if (i==4) setTextImg5({text:data.sentence[i], image:url})
                })
            }
        })
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const slideContent = (textImg) => {
        return (
            <>
                <div className='slide-content'>
                    <img src={textImg.image} />
                    <div className='slide-content-box'>
                        <p>{textImg.text}</p>
                    </div>
                </div>
            </>
        )
    }

    const slideContents = () => {
        let res = []
        if (textImg1.text!='') res.push(slideContent(textImg1))
        if (textImg2.text!='') res.push(slideContent(textImg2))
        if (textImg3.text!='') res.push(slideContent(textImg3))
        if (textImg4.text!='') res.push(slideContent(textImg4))
        if (textImg5.text!='') res.push(slideContent(textImg5))
        return res
    }

    return(
        <Layout>
            <div className='post-title'>
                <h1>{title}</h1>
            </div>
            <Slider {...settings}>
                {slideContents()}
            </Slider>
        </Layout>
    )
}

export default Post;