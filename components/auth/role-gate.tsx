'use client'
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../FormError";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole,
}

const RoleGate = ({
    children,
    allowedRole
}: RoleGateProps) => {
    const role = useCurrentRole();
    if (role !== allowedRole) {
        return (
            <FormError message="You dont not have permission to view this content!" />
        )
    }
    return (
        <>
            {children}
        </>
    )
}


export default RoleGate
