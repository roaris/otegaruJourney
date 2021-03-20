import Link from "next/link"


const Intro = () => {
    // const bg_random = {
    //     backgroundImage: 'url('+'../static/images/introbokashi.jpg'+')',
    //     backdropFilter: 'blur(8px)'
    //     // backgroundSize: 'cover',
    //     // backgroundPosition: 'center',
    // }

    const bg_random = {
        backgroundImage: 'url(../static/images/header_back.png)',
        backdropFilter: 'blur(8px)'
    }

    return(
        // <div style={bg_random}
        // className="min-w-screen min-h-screen max-w-full p-5 container flex flex-col justify-center items-center
        // bg-no-repeat bg-cover bg-center">
        <div style={bg_random} className='header-background'>
            {/* <div className='header-title'>
                <div className='text-white font-bold'>
                    <h1>お手軽Jorney</h1>
                    <h2>お手軽Jorneyは旅行の記録を投稿したり、他の人の旅行の記録を楽しむことの出来るアプリケーションです。</h2>
                    <Link href='#map'>
                    <button type="button" className="focus:outline-none font-bold py-2 px-2 rounded-md border-2 border-white hover:bg-gray-200 hover:border-gray-200">さっそく楽しむ</button>
                    </Link>
                </div>
            </div> */}
        </div>
    )
}

export default Intro