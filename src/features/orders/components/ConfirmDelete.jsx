import Button from "../../../components/Button";

export default function ConfirmDelete({ deleteFunction, clickCancle }) {
    return (
        <>
            <div className="flex gap-10 mt-5 justify-center">
                <Button bg="red" onClick={deleteFunction}>Delete</Button>
                <Button bg="green" onClick={() => clickCancle(false)} >Cancel</Button>
            </div>

        </>
    )
}