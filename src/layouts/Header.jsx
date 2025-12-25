
import logoImage from '../assets/thaiCuisine.png'
import Menu from './Menu'
import MenuLogin from './MenuLogin'

export default function Header() {
    //  flex justify-between items-center px-10 p-5 
    //             fixed top-0 left-0 w-full z-20 bg-black opacity-90

    return (
        <header
            className='
            flex flex-col
            fixed top-0 left-0 w-full z-20 bg-black opacity-90
            lg:px-25
            '
        >
            <div className='flex justify-between items-center px-5 pt-5'>
                <img
                    src={logoImage}
                    className='h-15 w-15 object-cover rounded-lg '
                    alt="logo" />

                <MenuLogin />
            </div>
            <div className=' flex  lg:justify-end'>
                <Menu />
            </div>


        </header>
    )
}

