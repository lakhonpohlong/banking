import { useSession } from "next-auth/react"

export const useCurrentRole = () => {
    const session = useSession();

    if (session) return session.data?.user.role;

    return null;
}