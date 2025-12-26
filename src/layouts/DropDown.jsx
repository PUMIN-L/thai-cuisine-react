
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Modal from '../components/Modal'
import AccountSettingForm from '../features/althentication/components/AccountSettingsForm'
import { useState } from 'react'

export default function Dropdown({ username, logout }) {

    const [openAccountSentting, setAccountSetting] = useState(false)

    return (
        <Menu as="div" className="relative inline-block text-xl">
            <MenuButton className="inline-flex w-full h-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 
            text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 
            dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20
              cursor-pointer ">
                <p className=' font-bold lg:text-lg' >{username}</p>

                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 lg:size-7 text-gray-400 " />
            </MenuButton>

            <MenuItems
                transition

                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md   shadow-lg outline-1 
            outline-black/5 transition data-closed:scale-95 data-closed:transform 
            data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 
            data-leave:ease-in bg-black dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
                <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700  data-focus:bg-gray-900 
                            data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 
                            dark:data-focus:bg-gray/5 dark:data-focus:text-white "
                        >
                            Support
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <div
                            onClick={() => setAccountSetting(prev => !prev)}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-900 
                            data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-gray/5 
                            dark:data-focus:text-white cursor-pointer"
                        >
                            Account settings
                        </div>

                    </MenuItem>

                    <MenuItem>
                        <a
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-900 
                            data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-gray/5 
                            dark:data-focus:text-white cursor-pointer"

                            onClick={logout}
                        >
                            Sign out
                        </a>
                    </MenuItem>
                </div>
            </MenuItems>
            <Modal
                open={openAccountSentting}
                onClose={() => setAccountSetting(false)}
                title="Account Setting"

            >
                <AccountSettingForm
                    onSuccess={() => setAccountSetting(false)}
                />
            </Modal>
        </Menu >


    )
}
