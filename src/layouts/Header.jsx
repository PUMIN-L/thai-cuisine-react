
import logoImage from '../assets/thaiCuisine.png'
import Menu from './Menu'
import MenuLogin from './MenuLogin'

export default function Header() {


    return (
        <header
            className='flex justify-between items-center px-10 p-5 fixed top-0 left-0 w-full z-20 bg-black opacity-90'
        >
            <div>
                <img
                    src={logoImage}
                    className='h-15 w-15 object-cover rounded-lg '
                    alt="logo" />
            </div>
            <div>

                <MenuLogin />
                <Menu />

            </div>
        </header>
    )
}