import Link from "next/link";
import LogoutButton from "../../../components/LogoutButton";

export default function Movies() {
    return (
        <div>
            Hello Movies
            <Link href="/">Back to home</Link>
            <LogoutButton/>
        </div>
    )
}