
import authApi from "../../../apis/auth";
import PictureForm from "../../profile/components/PictureForm";
import useAuth from "../../../hook/useAuth";
import Avatar from "./Avatar";




export default function AccountSettingForm({ onSuccess }) {

    const { authUser } = useAuth()


    return (
        <div>
            <PictureForm
                title="Edit Profile picture"
                initialImage={authUser?.picture}
                render={src => <Avatar src={src} size={4.5} />}
                onSuccess={onSuccess}
            />

        </div>
    )
}