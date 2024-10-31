import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const ADMIN = UserRole.ADMIN;
const MANAGER = UserRole.MANAGER;
