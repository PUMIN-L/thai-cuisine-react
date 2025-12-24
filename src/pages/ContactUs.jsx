export default function ContectUs() {
    return (<>
        <div className="bg-gray-200 p-15 mt-35 rounded-lg xl:h-[35rem]">
            <div className=" max-w-xl mx-auto p-8  bg-gray-900 border border-gray-700 rounded-2xl 
            shadow-lg flex flex-col items-center   ">

                <h2 className="text-xl font-semibold text-white mb-6 text-center tracking-wide">
                    Contact Information
                </h2>

                <div className="flex">
                    <div className="space-y-3 text-gray-300 text-sm">
                        <p className="text-lg font-medium text-white ">
                            Mr. Pumin Lomwong
                        </p>

                        <div className="flex gap-5 ">
                            <span className="text-gray-400 w-13 ">Phone :</span>
                            <span className="w-35 ">062-012-9895</span>
                        </div>
                        <div className="flex gap-5">
                            <span className="text-gray-400   w-13">Email :</span>
                            <span className="w-35 ">puminbg@gmail.com</span>
                        </div>

                        <div className="flex gap-5">
                            <span className="text-gray-400  w-13">Line ID:</span>
                            <span className="w-35 " >puminkmutnb</span>
                        </div>
                    </div>
                    <div className="max-w-30 ml-10 mt-1">
                        <img
                            src="https://res.cloudinary.com/dtbfee3ql/image/upload/v1766140321/0AADBAA9-DA84-4BF0-A207-61089FC84F25_wlbyyw.jpg"
                            alt="ID" />
                    </div>

                </div>



            </div>
        </div>


    </>)
}