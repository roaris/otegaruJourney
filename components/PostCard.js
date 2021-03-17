
const PostCard = (props) => {
    // TODO:propsで引数を与えて、指定した画像を表示できるようにする
    return(
        <div className='w-80'>
            <article className="overflow-hidden rounded-lg shadow-lg">

                <a href="#">
                    <img alt="Placeholder" className="block h-64 w-full" src="./static/images/tizu.png" style={{objectFit:"contain"}}/>
                </a>

                <div className='h-40'>
                    <header className="flex-wrap items-center justify-between leading-tight p-2 md:p-4">
                        <h1 className="text-lg">
                            <a className="no-underline hover:underline text-black" href="#">
                                日本一周の旅だった
                            </a>
                        </h1>

                        <p className="text-grey-darker text-sm">
                            Date
                        </p>
                    </header>

                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                            {/* <img alt="Placeholder" className="block rounded-full" src="../static/images/train.png" style={{objectFit:"contain"}}/> */}
                            <p className="text-sm">
                                Author Name
                            </p>
                        </a>
                        {/* <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                            <span className="hidden">Like</span>
                            <i className="fa fa-heart"></i>
                        </a> */}
                    </footer>
                </div>
            </article>
        </div>  
    )
}

export default PostCard;