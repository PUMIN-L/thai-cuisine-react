
import logoImage from '../assets/thaiCuisine.png'
import Menu from './Menu'
import MenuLogin from './MenuLogin'

export default function Header() {


    return (
        <header
            className='
            flex flex-col
            fixed top-0 left-0 w-full z-20 bg-black opacity-90
            lg:px-25 lg:text-xl
            '
        >
            <div className='flex justify-between items-center px-5 pt-5'>
                <img
                    src={logoImage}
                    className='h-15 w-15 object-cover rounded-lg lg:h-20 lg:w-20 '
                    alt="logo" />

                <MenuLogin />
            </div>
            <div className=' flex  lg:justify-end '>
                <Menu />
            </div>


        </header>
    )
}

